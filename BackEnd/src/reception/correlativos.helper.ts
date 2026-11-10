import type { Prisma, PrismaClient } from '@prisma/client';

type PrismaDb = PrismaClient | Prisma.TransactionClient;

/**
 * Extrae un código corto de cosecha para correlativos (ej. "2026-2027" -> "2627").
 */
export function formatCodigoCosecha(cosecha?: string | null): string {
  const raw = (cosecha || '').trim();

  const match4 = raw.match(/(\d{4})\D+(\d{4})/);
  if (match4) {
    return `${match4[1].slice(-2)}${match4[2].slice(-2)}`;
  }

  const match2 = raw.match(/^(\d{2})\D+(\d{2})$/);
  if (match2) {
    return `${match2[1]}${match2[2]}`;
  }

  const cleaned = raw.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 12);
  if (cleaned) {
    return cleaned;
  }

  return String(new Date().getFullYear()).slice(-2);
}

/**
 * Obtiene el código corto de cosecha por ID, o de la cosecha actual activa como respaldo.
 */
export async function getCodigoCosechaById(
  db: PrismaDb,
  idCosecha?: number | null,
): Promise<string> {
  if (idCosecha) {
    const cosecha = await db.cosecha.findUnique({
      where: { id_cosecha: idCosecha },
      select: { cosecha: true },
    });
    if (cosecha?.cosecha) {
      return formatCodigoCosecha(cosecha.cosecha);
    }
  }

  const actual = await db.cosecha.findFirst({
    where: { estado: true, cosecha_actual: true },
    orderBy: { id_cosecha: 'desc' },
    select: { cosecha: true },
  });

  return formatCodigoCosecha(actual?.cosecha);
}

export function buildCorrelativoBase(prefix: string, codCosecha: string): string {
  return `${prefix}-${codCosecha}-`;
}

/**
 * Genera uno o más correlativos secuenciales con el formato `<PREFIJO>-<COSECHA>-<SECUENCIA>`,
 * reiniciando el conteo en 1 por cada cosecha y evitando colisiones con registros existentes.
 */
export async function generarCorrelativos(options: {
  prefix: string;
  codCosecha: string;
  digits: number;
  cantidad?: number;
  countFn: (basePrefix: string) => Promise<number>;
  existsFn: (candidate: string) => Promise<boolean>;
}): Promise<string[]> {
  const { prefix, codCosecha, digits, cantidad = 1, countFn, existsFn } = options;
  if (cantidad <= 0) return [];

  const basePrefix = buildCorrelativoBase(prefix, codCosecha);
  let seq = (await countFn(basePrefix)) + 1;
  const results: string[] = [];

  while (results.length < cantidad) {
    const candidate = `${basePrefix}${String(seq).padStart(digits, '0')}`;
    if (!(await existsFn(candidate))) {
      results.push(candidate);
    }
    seq++;
  }

  return results;
}
