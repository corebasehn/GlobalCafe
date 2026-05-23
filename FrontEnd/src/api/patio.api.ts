import { http } from "./http";
import { DetalleRecepcion } from "./reception.api";

export interface NotaPatioRequest {
  id_detalle_recepcion: number;
  id_estiba: number;
  cantidad_sacos_buenos: number;
  cantidad_sacos_faltos: number;
  observaciones_faltos?: string;
}

export interface RecepcionPatio extends DetalleRecepcion {
  recepcion: {
    numero_entrada: string;
    conductor: { nombre: string };
    placa_cabezal: { placa: string };
  };
  proveedor: { nombre: string };
}

export async function getRecepcionesParaPatioApi(): Promise<RecepcionPatio[]> {
  const { data } = await http.get<RecepcionPatio[]>("/reception/patio/pendientes");
  return data;
}

export async function crearNotaPatioApi(payload: NotaPatioRequest): Promise<void> {
  await http.post("/reception/patio/nota", payload);
}

export async function getPendientesAprobacionGerenciaApi(): Promise<any[]> {
  const { data } = await http.get<any[]>("/reception/patio/pendientes-aprobacion");
  return data;
}

export async function decidirFaltosApi(id_detalle: number, decision: "APROBAR" | "DEVOLVER", observaciones?: string): Promise<void> {
  await http.post(`/reception/patio/decidir-faltos/${id_detalle}`, { decision, observaciones });
}
