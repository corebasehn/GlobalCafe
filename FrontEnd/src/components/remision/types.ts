export interface RemisionDetalleForm {
  id_detalle_recepcion?: number;
  id_proveedor: string;
  cantidad_sacos: string;
  cantidad_qq: string;
  remision: string;
  id_tipo_remision: string;
  id_tipo_cafe: string;
  id_tipo_empaque: string;
  observaciones: string;
  is_editable?: boolean;
}

export interface RemisionFormData {
  id_cosecha: string;
  tipo_vehiculo: string;
  id_placa_cabezal: string;
  id_placa_furgon: string;
  id_transporte: string;
  id_conductor: string;
  id_municipio: string;
  marchamo: string;
  observaciones: string;
  detalles: RemisionDetalleForm[];
}

export const initialState: RemisionFormData = {
  id_cosecha: "",
  tipo_vehiculo: "Camión Rígido",
  id_placa_cabezal: "",
  id_placa_furgon: "",
  id_transporte: "",
  id_conductor: "",
  id_municipio: "",
  marchamo: "",
  observaciones: "",
  detalles: [{
    id_proveedor: "",
    cantidad_sacos: "",
    cantidad_qq: "",
    remision: "",
    id_tipo_remision: "",
    id_tipo_cafe: "",
    id_tipo_empaque: "",
    observaciones: "",
    is_editable: true,
  }],
};
