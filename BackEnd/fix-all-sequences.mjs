import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); // v2

async function main() {
  // Todas las tablas con secuencias potencialmente desincronizadas
  const tables = [
    { table: 'cambio_cabezal',     seq: 'cambio_cabezal_id_cambio_cabezal_seq',         pk: 'id_cambio_cabezal' },
    { table: 'analisis_defectos',  seq: 'analisis_defectos_id_analisis_defectos_seq',    pk: 'id_analisis_defectos' },
    { table: 'analisis_zarandas',  seq: 'analisis_zarandas_id_analisis_zarandas_seq',    pk: 'id_analisis_zarandas' },
    { table: 'analisis_tazas',     seq: 'analisis_tazas_id_analisis_tazas_seq',          pk: 'id_analisis_tazas' },
    { table: 'analisis_calidad',   seq: 'analisis_calidad_id_analisis_calidad_seq',      pk: 'id_analisis_calidad' },
    { table: 'detalle_recepcion',  seq: 'detalle_recepcion_id_detalle_recepcion_seq',    pk: 'id_detalle_recepcion' },
    { table: 'recepcion',          seq: 'recepcion_id_recepcion_seq',                   pk: 'id_recepcion' },
    { table: 'log_sistema',        seq: 'log_sistema_id_log_seq',                       pk: 'id_log' },
  ];

  for (const { table, seq, pk } of tables) {
    try {
      const rows = await prisma.$queryRawUnsafe(`SELECT COALESCE(MAX(${pk}), 1) AS maxval FROM ${table}`);
      const maxVal = Number(rows[0].maxval);
      await prisma.$queryRawUnsafe(`SELECT setval('${seq}', ${maxVal})`);
      const cur = await prisma.$queryRawUnsafe(`SELECT last_value FROM ${seq}`);
      console.log(`✅ ${table}: → ${Number(cur[0].last_value)}`);
    } catch (e) {
      console.warn(`⚠️  ${table}: ${e.message}`);
    }
  }
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
