import {
  buildCorrelativoBase,
  formatCodigoCosecha,
  generarCorrelativos,
  getCodigoCosechaById,
  resolverOrigenRemision,
} from './correlativos.helper';

describe('correlativos.helper', () => {
  describe('formatCodigoCosecha', () => {
    it('convierte periodos estándar de 4 dígitos a código corto de 4 dígitos', () => {
      expect(formatCodigoCosecha('2026-2027')).toBe('2627');
      expect(formatCodigoCosecha('2025-2026')).toBe('2526');
      expect(formatCodigoCosecha(' 2024 / 2025 ')).toBe('2425');
    });

    it('soporta formatos cortos y personalizados', () => {
      expect(formatCodigoCosecha('26-27')).toBe('2627');
      expect(formatCodigoCosecha('2026-A')).toBe('2026A');
    });

    it('usa los últimos 2 dígitos del año actual si la entrada viene vacía', () => {
      const expected = String(new Date().getFullYear()).slice(-2);
      expect(formatCodigoCosecha('')).toBe(expected);
      expect(formatCodigoCosecha(null)).toBe(expected);
    });
  });

  describe('getCodigoCosechaById', () => {
    it('consulta por id_cosecha y devuelve código formateado', async () => {
      const db = {
        cosecha: {
          findUnique: jest.fn().mockResolvedValue({ cosecha: '2026-2027' }),
          findFirst: jest.fn(),
        },
      } as any;

      await expect(getCodigoCosechaById(db, 4)).resolves.toBe('2627');
      expect(db.cosecha.findUnique).toHaveBeenCalledWith({
        where: { id_cosecha: 4 },
        select: { cosecha: true },
      });
    });

    it('cae a cosecha_actual si no hay idCosecha', async () => {
      const db = {
        cosecha: {
          findUnique: jest.fn(),
          findFirst: jest.fn().mockResolvedValue({ cosecha: '2027-2028' }),
        },
      } as any;

      await expect(getCodigoCosechaById(db, undefined)).resolves.toBe('2728');
      expect(db.cosecha.findFirst).toHaveBeenCalledWith({
        where: { estado: true, cosecha_actual: true },
        orderBy: { id_cosecha: 'desc' },
        select: { cosecha: true },
      });
    });
  });

  describe('generarCorrelativos', () => {
    it('reinicia en 00001 cuando la nueva cosecha no tiene registros previos', async () => {
      const countFn = jest.fn().mockResolvedValue(0);
      const existsFn = jest.fn().mockResolvedValue(false);

      const res = await generarCorrelativos({
        prefix: 'INT',
        codCosecha: '2627',
        digits: 5,
        countFn,
        existsFn,
      });

      expect(countFn).toHaveBeenCalledWith('INT-2627-');
      expect(res).toEqual(['INT-2627-00001']);
    });

    it('salta colisiones y genera lotes secuenciales para múltiples detalles', async () => {
      const existentes = new Set(['MUE-2627-00002', 'MUE-2627-00003']);
      const res = await generarCorrelativos({
        prefix: 'MUE',
        codCosecha: '2627',
        digits: 5,
        cantidad: 3,
        countFn: async () => 1,
        existsFn: async (c) => existentes.has(c),
      });

      expect(res).toEqual([
        'MUE-2627-00004',
        'MUE-2627-00005',
        'MUE-2627-00006',
      ]);
    });

    it('retorna arreglo vacío cuando cantidad es 0', async () => {
      const countFn = jest.fn();
      const res = await generarCorrelativos({
        prefix: 'MUE',
        codCosecha: '2627',
        digits: 5,
        cantidad: 0,
        countFn,
        existsFn: async () => false,
      });

      expect(res).toEqual([]);
      expect(countFn).not.toHaveBeenCalled();
    });

    it('construye la base de prefijo correctamente', () => {
      expect(buildCorrelativoBase('NP', '2627')).toBe('NP-2627-');
    });

    it('lleva correlativos de Nota de Peso independientes para INT y EXT', async () => {
      const existentes = ['NP-INT-2627-0000001', 'NP-INT-2627-0000002', 'NP-EXT-2627-0000001'];
      const countFn = async (base: string) => existentes.filter((n) => n.startsWith(base)).length;
      const existsFn = async (c: string) => existentes.includes(c);

      const [interno] = await generarCorrelativos({ prefix: 'NP-INT', codCosecha: '2627', digits: 7, countFn, existsFn });
      const [externo] = await generarCorrelativos({ prefix: 'NP-EXT', codCosecha: '2627', digits: 7, countFn, existsFn });

      expect(interno).toBe('NP-INT-2627-0000003');
      expect(externo).toBe('NP-EXT-2627-0000002');
    });

    it('genera Nota de Patio con prefijo PAT sin mezclarse con Nota de Peso', async () => {
      const [patio] = await generarCorrelativos({
        prefix: 'PAT',
        codCosecha: '2627',
        digits: 5,
        countFn: async (base) => (base === 'PAT-2627-' ? 0 : 99),
        existsFn: async () => false,
      });
      expect(patio).toBe('PAT-2627-00001');
    });
  });

  describe('resolverOrigenRemision', () => {
    it('usa el tipo de remisión cuando existe', () => {
      expect(resolverOrigenRemision({ idTipoRemision: 1 })).toBe('INT');
      expect(resolverOrigenRemision({ idTipoRemision: 2 })).toBe('EXT');
      expect(resolverOrigenRemision({ idTipoRemision: 7, nombreTipoRemision: 'Interno Global' })).toBe('INT');
      expect(resolverOrigenRemision({ idTipoRemision: 2, nombreTipoRemision: 'Externo', numeroEntrada: 'INT-00001' })).toBe('EXT');
    });

    it('cae al prefijo del número de entrada si no hay tipo de remisión', () => {
      expect(resolverOrigenRemision({ numeroEntrada: 'INT-2627-00001' })).toBe('INT');
      expect(resolverOrigenRemision({ numeroEntrada: 'EXT-2627-00001' })).toBe('EXT');
      expect(resolverOrigenRemision({ numeroEntrada: 'REC-00010' })).toBe('EXT');
      expect(resolverOrigenRemision({})).toBe('EXT');
    });
  });
});
