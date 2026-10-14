export type EstadoContrato = "Creado" | "Enviado a Cliente" | "Confirmado";

export const CERTIFICACIONES_DISPONIBLES = ["RFA", "Organic", "Fairtrade", "EUDR"] as const;
export type Certificacion = typeof CERTIFICACIONES_DISPONIBLES[number];

export const TIPOS_EMPAQUE = ["Saco Yute", "Big Bag", "Granel/Bulk", "Polietileno"] as const;
export type TipoEmpaque = typeof TIPOS_EMPAQUE[number];

export const CALIDADES_DISPONIBLES = [
  "Excelso EP", "Supremo EP", "Excelso UGQ", "Europa Premium", "Strictly High Grown", "Extra Fancy",
];

export interface Lote {
  no_lote: string;
  no_partida: string; // formato 13-XXX-XXX
  calidad: string;
  certificaciones: Certificacion[];
  cooperativa: string;
  defectos_maximos: number;
  peso_neto_qq: number;
  cantidad_sacos: number;
  tipo_empaque: TipoEmpaque;
  marca_sacos: string;
  estado: "Pendiente" | "En Empaque" | "Listo para Embarque";
}

export interface Contrato {
  id: string; // No. Contrato - texto libre, formato variable según cliente
  cliente: string;
  aviso_venta: string; // referencia de cosecha
  cosecha: string; // usado para el filtro por cosecha
  calidad_pactada: string;
  cantidad_sacos_pactada: number;
  precio_pactado: number; // USD por saco
  destino: string;
  estado: EstadoContrato;
  fecha_creacion: string; // ISO yyyy-mm-dd
  lotes: Lote[];
}

export const CLIENTES_DISPONIBLES = [
  "Starbucks Corp", "Nestlé AG", "Lavazza SpA", "Neumann Kaffee Gruppe", "Volcafe Ltd",
];

export const COSECHAS_DISPONIBLES = ["2023/2024", "2024/2025", "2025/2026"];

// "Base de datos" en memoria: se comparte entre la lista y el detalle mientras dura la sesión del navegador.
export const mockContratos: Contrato[] = [
  {
    id: "P41008",
    cliente: "Starbucks Corp",
    aviso_venta: "AV-2024-0142",
    cosecha: "2024/2025",
    calidad_pactada: "Strictly High Grown",
    cantidad_sacos_pactada: 5000,
    precio_pactado: 220,
    destino: "Seattle, USA",
    estado: "Confirmado",
    fecha_creacion: "2024-10-02",
    lotes: [
      {
        no_lote: "150", no_partida: "13-045-001", calidad: "Strictly High Grown",
        certificaciones: ["RFA", "Organic"], cooperativa: "Coop. Los Andes",
        defectos_maximos: 8, peso_neto_qq: 250, cantidad_sacos: 500,
        tipo_empaque: "Saco Yute", marca_sacos: "STARBUCKS SHG - EXPORT QUALITY",
        estado: "Listo para Embarque",
      },
    ],
  },
  {
    id: "NPHN-36529",
    cliente: "Nestlé AG",
    aviso_venta: "AV-2024-0158",
    cosecha: "2024/2025",
    calidad_pactada: "Excelso EP",
    cantidad_sacos_pactada: 8000,
    precio_pactado: 215,
    destino: "Vevey, Suiza",
    estado: "Enviado a Cliente",
    fecha_creacion: "2024-10-12",
    lotes: [],
  },
  {
    id: "C-10141",
    cliente: "Lavazza SpA",
    aviso_venta: "AV-2024-0139",
    cosecha: "2023/2024",
    calidad_pactada: "Europa Premium",
    cantidad_sacos_pactada: 3500,
    precio_pactado: 225,
    destino: "Turín, Italia",
    estado: "Creado",
    fecha_creacion: "2024-09-28",
    lotes: [
      {
        no_lote: "88", no_partida: "13-030-014", calidad: "Europa Premium",
        certificaciones: ["Fairtrade"], cooperativa: "Coop. Buenavista",
        defectos_maximos: 12, peso_neto_qq: 175, cantidad_sacos: 350,
        tipo_empaque: "Big Bag", marca_sacos: "LAVAZZA EP LOTE 88",
        estado: "En Empaque",
      },
    ],
  },
  {
    id: "85967",
    cliente: "Neumann Kaffee Gruppe",
    aviso_venta: "AV-2024-0161",
    cosecha: "2024/2025",
    calidad_pactada: "Excelso UGQ",
    cantidad_sacos_pactada: 6200,
    precio_pactado: 205,
    destino: "Hamburgo, Alemania",
    estado: "Creado",
    fecha_creacion: "2024-11-05",
    lotes: [],
  },
];
