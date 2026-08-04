import { http } from "./http";

export interface NotaPesoDetalle {
  id_nota_peso_detalle: number;
  id_nota_peso: number;
  cantidad_sacos: number;
  peso_bruto: number;
  tara: number;
  porcentaje_descuento_humedad?: number;
  porcentaje_descuento_calidad?: number;
  porcentaje_descuento_peso?: number;
  porcentaje_descuento_dano?: number;
  peso_neto: number;
}

export interface NotaDePeso {
  id_nota_peso: number;
  id_detalle_recepcion: number;
  numero_nota_peso: string;
  fecha_nota_peso: string;
  observaciones?: string;
  detalles: NotaPesoDetalle[];
  detalle_recepcion?: any; // Incluye info de proveedor y recepción
}

export async function getPendientesLiquidarApi(): Promise<any[]> {
  const { data } = await http.get<any[]>("/nota-peso/pendientes");
  return data;
}

export async function crearNotaPesoApi(idDetalle: number): Promise<NotaDePeso> {
  const { data } = await http.post<NotaDePeso>(`/nota-peso/liquidar/${idDetalle}`);
  return data;
}

export async function getNotasPesoApi(): Promise<NotaDePeso[]> {
  const { data } = await http.get<NotaDePeso[]>("/nota-peso");
  return data;
}

export async function getNotaPesoByIdApi(id: number): Promise<NotaDePeso> {
  const { data } = await http.get<NotaDePeso>(`/nota-peso/${id}`);
  return data;
}
