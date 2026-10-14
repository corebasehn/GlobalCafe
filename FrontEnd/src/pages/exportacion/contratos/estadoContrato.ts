import type { EstadoContrato } from "./mockData";

export function getEstadoContratoVariant(estado: EstadoContrato): string {
  switch (estado) {
    case "Creado": return "secondary";
    case "Enviado a Cliente": return "info";
    case "Confirmado": return "success";
    default: return "secondary";
  }
}
