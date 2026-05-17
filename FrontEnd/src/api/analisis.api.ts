import { http } from "./http";

// ── Payload DTOs (request) ──────────────────────────────────────────────────
export interface AnalisisDefectoDto { id_defecto: number; cantidad: number; }
export interface AnalisisZarandaDto { id_zaranda: number; cantidad: number; }
export interface AnalisisTazaDto    { id_tazas:   number; cantidad: number; }

// ── Response shapes (what the backend returns) ──────────────────────────────
export interface AnalisisDefectoItem {
  id_analisis_defectos: number;
  cantidad: number;
  defecto?: { nombre: string };
}

export interface AnalisisZarandaItem {
  id_analisis_zarandas: number;
  cantidad: number;
  zaranda?: { nombre: string };
}

export interface AnalisisTazaItem {
  id_analisis_tazas: number;
  cantidad: number;
  taza?: { nombre: string };
}

export interface AnalisisResponse {
  id_analisis: number;
  fecha_analisis: string;
  tipo_analisis: string;
  humedad?: number;
  dano?: number;
  primer_rendimiento?: number;
  segundo_rendimiento?: number;
  observaciones?: string;
  catador?: { nombre: string };
  calidad?: { nombre: string };
  analisis_defectos?: AnalisisDefectoItem[];
  analisis_zarandas?: AnalisisZarandaItem[];
  analisis_tazas?: AnalisisTazaItem[];
}

export interface CreateAnalisisRequest {
  id_detalle_recepcion: number;
  tipo_analisis: string;
  id_catador: number;
  primer_rendimiento?: number;
  segundo_rendimiento?: number;
  humedad?: number;
  dano?: number;
  id_calidad?: number;
  observaciones?: string;
  defectos?: AnalisisDefectoDto[];
  zarandas?: AnalisisZarandaDto[];
  tazas?: AnalisisTazaDto[];
}

export async function createAnalisisApi(payload: CreateAnalisisRequest): Promise<any> {
  const { data } = await http.post("/analisis", payload);
  return data;
}

export async function getAnalisisPendientesApi(): Promise<any[]> {
  const { data } = await http.get("/analisis/pendientes");
  return data;
}
export interface VeredictoGerenciaRequest {
  veredicto: "APROBAR" | "SEGUNDA_MUESTRA" | "DEVOLUCION";
  observaciones?: string;
}

export const veredictoGerenciaApi = async (idAnalisis: number, data: VeredictoGerenciaRequest) => {
  const response = await http.patch(`/analisis/${idAnalisis}/veredicto`, data);
  return response.data;
};
