import { DetalleRecepcion } from "../../api/reception.api";

export interface CargaPendiente extends DetalleRecepcion {
  numero_entrada: string;
  fecha_entrada: string;
  proveedor_nombre: string;
}

export interface MuestreoFormData {
  tipo_analisis: string;
  observaciones: string;
}

export const initialMuestreoForm: MuestreoFormData = {
  tipo_analisis: "Muestra Previa",
  observaciones: "",
};
