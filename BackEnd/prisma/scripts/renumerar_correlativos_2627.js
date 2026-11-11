/**
 * Renumeración de correlativos de la cosecha 2026-2027 (código 2627).
 *
 * Qué renumera (solo cosecha 2026-2027):
 *   - Recepciones INT/EXT          -> INT-2627-00001 / EXT-2627-00001 (secuencia por prefijo)
 *   - Notas de Peso                -> NP-INT-2627-0000001 / NP-EXT-2627-0000001 (secuencia por origen)
 *   - Notas de Patio               -> PAT-2627-00001
 * Orden de asignación: fecha del documento y luego id (el más antiguo recibe el 1).
 * Otros movimientos (CAS-, MOV-, etc.) y cosechas anteriores NO se tocan.
 *
 * Uso (desde la carpeta BackEnd):
 *   node prisma/scripts/renumerar_correlativos_2627.js                 -> SIMULACIÓN (solo lectura)
 *   node prisma/scripts/renumerar_correlativos_2627.js --apply --confirm-host=<host>
 *
 * Conexión: usa RENUM_DATABASE_URL si existe; si no, DATABASE_URL del .env.
 * --apply exige --confirm-host igual al host de la conexión, para evitar correrlo contra la base equivocada.
 */
const path = require('path');
const { PrismaClient } = require(path.join(process.cwd(), 'node_modules/@prisma/client'));

const COSECHA = '2026-2027';
const COD = '2627';

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const confirmHost = (args.find((a) => a.startsWith('--confirm-host=')) || '').split('=')[1];

const url = process.env.RENUM_DATABASE_URL || process.env.DATABASE_URL;
if (!url) {
  console.error('No hay RENUM_DATABASE_URL ni DATABASE_URL.');
  process.exit(1);
}
const host = new URL(url).host;

const pad = (n, d) => String(n).padStart(d, '0');

function origenNotaPeso(row) {
  const nombre = (row.tipo_remision || '').toLowerCase();
  if (row.id_tipo_remision || nombre) {
    return row.id_tipo_remision === 1 || nombre.includes('int') ? 'INT' : 'EXT';
  }
  return (row.numero_entrada || '').toUpperCase().startsWith('INT-') ? 'INT' : 'EXT';
}

async function construirPlan(tx) {
  const recepciones = await tx.$queryRawUnsafe(
    `select r.id_recepcion id, r.numero_entrada actual, split_part(r.numero_entrada,'-',1) prefijo
       from recepcion r join cosecha c on c.id_cosecha = r.id_cosecha
      where c.cosecha = $1 and split_part(r.numero_entrada,'-',1) in ('INT','EXT')
      order by r.fecha_entrada, r.id_recepcion`,
    COSECHA,
  );
  const seqRec = { INT: 0, EXT: 0 };
  const planRec = recepciones.map((r) => ({
    id: r.id, actual: r.actual, nuevo: `${r.prefijo}-${COD}-${pad(++seqRec[r.prefijo], 5)}`,
  }));

  const notasPeso = await tx.$queryRawUnsafe(
    `select np.id_nota_peso id, np.numero_nota_peso actual, d.id_tipo_remision, tr.tipo_remision, r.numero_entrada
       from nota_de_peso np
       join detalle_recepcion d on d.id_detalle_recepcion = np.id_detalle_recepcion
       join recepcion r on r.id_recepcion = d.id_recepcion
       join cosecha c on c.id_cosecha = r.id_cosecha
       left join tipo_remision tr on tr.id_tipo_remision = d.id_tipo_remision
      where c.cosecha = $1
      order by np.fecha_nota_peso, np.id_nota_peso`,
    COSECHA,
  );
  const seqNp = { INT: 0, EXT: 0 };
  const planNp = notasPeso.map((n) => {
    const o = origenNotaPeso(n);
    return { id: n.id, actual: n.actual, nuevo: `NP-${o}-${COD}-${pad(++seqNp[o], 7)}` };
  });

  const notasPatio = await tx.$queryRawUnsafe(
    `select p.id_nota_patio id, p.numero_nota_patio actual
       from nota_de_patio p
       join detalle_recepcion d on d.id_detalle_recepcion = p.id_detalle_recepcion
       join recepcion r on r.id_recepcion = d.id_recepcion
       join cosecha c on c.id_cosecha = r.id_cosecha
      where c.cosecha = $1
      order by p.fecha_nota_patio, p.id_nota_patio`,
    COSECHA,
  );
  let seqPat = 0;
  const planPat = notasPatio.map((p) => ({ id: p.id, actual: p.actual, nuevo: `PAT-${COD}-${pad(++seqPat, 5)}` }));

  return {
    recepcion: { tabla: 'recepcion', col: 'numero_entrada', pk: 'id_recepcion', filas: planRec },
    notaPeso: { tabla: 'nota_de_peso', col: 'numero_nota_peso', pk: 'id_nota_peso', filas: planNp },
    notaPatio: { tabla: 'nota_de_patio', col: 'numero_nota_patio', pk: 'id_nota_patio', filas: planPat },
  };
}

async function validarColisiones(tx, grupo) {
  // Un número nuevo no puede existir ya en otro registro que no sea parte de este mismo plan
  const ids = grupo.filas.map((f) => f.id);
  const nuevos = grupo.filas.map((f) => f.nuevo);
  if (!nuevos.length) return [];
  return tx.$queryRawUnsafe(
    `select ${grupo.pk} id, ${grupo.col} numero from ${grupo.tabla}
      where ${grupo.col} = any($1::text[]) and not (${grupo.pk} = any($2::int[]))`,
    nuevos, ids,
  );
}

function imprimir(nombre, grupo) {
  const cambios = grupo.filas.filter((f) => f.actual !== f.nuevo);
  console.log(`\n== ${nombre}: ${grupo.filas.length} registros, ${cambios.length} cambian ==`);
  grupo.filas.forEach((f) => console.log(`  id ${f.id}: ${f.actual}  ->  ${f.nuevo}${f.actual === f.nuevo ? '  (sin cambio)' : ''}`));
}

async function aplicar(tx, grupo) {
  const filas = grupo.filas.filter((f) => f.actual !== f.nuevo);
  // Fase 1: valores temporales para no chocar con la restricción UNIQUE durante el intercambio
  for (const f of filas) {
    await tx.$executeRawUnsafe(`update ${grupo.tabla} set ${grupo.col} = $1 where ${grupo.pk} = $2`, `TMP-RENUM-${grupo.tabla}-${f.id}`, f.id);
  }
  // Fase 2: valores definitivos
  for (const f of filas) {
    await tx.$executeRawUnsafe(
      `update ${grupo.tabla} set ${grupo.col} = $1, fecha_modificacion = now() where ${grupo.pk} = $2`,
      f.nuevo, f.id,
    );
  }
  return filas.length;
}

(async () => {
  const prisma = new PrismaClient({ datasources: { db: { url } } });
  console.log(`Base: ${host}`);
  console.log(`Modo: ${APPLY ? 'APLICAR CAMBIOS' : 'SIMULACIÓN (solo lectura)'}`);

  if (APPLY && confirmHost !== host) {
    console.error(`\nPara aplicar debes pasar --confirm-host=${host}`);
    await prisma.$disconnect();
    process.exit(1);
  }

  try {
    await prisma.$transaction(async (tx) => {
      if (!APPLY) await tx.$executeRawUnsafe('SET TRANSACTION READ ONLY');

      const plan = await construirPlan(tx);
      imprimir('Recepciones', plan.recepcion);
      imprimir('Notas de Peso', plan.notaPeso);
      imprimir('Notas de Patio', plan.notaPatio);

      for (const [nombre, grupo] of Object.entries(plan)) {
        const choques = await validarColisiones(tx, grupo);
        if (choques.length) {
          throw new Error(`Colisión en ${nombre}: ${JSON.stringify(choques)}`);
        }
      }

      if (!APPLY) {
        console.log('\nSimulación terminada. No se guardó nada.');
        return;
      }

      const n1 = await aplicar(tx, plan.recepcion);
      const n2 = await aplicar(tx, plan.notaPeso);
      const n3 = await aplicar(tx, plan.notaPatio);
      console.log(`\nAplicado: ${n1} recepciones, ${n2} notas de peso, ${n3} notas de patio.`);
    }, { timeout: 60000 });
  } catch (e) {
    console.error('\nERROR (no se guardó nada):', e.message);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
