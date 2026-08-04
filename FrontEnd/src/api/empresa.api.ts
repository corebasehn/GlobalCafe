import { http } from "./http";

export interface Empresa {
  id_empresa: number;
  nombre: string;
  razon_social?: string;
  rtn?: string;
  registro_sanitario?: string;
  direccion?: string;
  telefono?: string;
  telefono_secundario?: string;
  correo?: string;
  pais?: string;
  ciudad?: string;
  sitio_web?: string;
  eslogan?: string;
}


export const getEmpresaConfigApi = async (): Promise<Empresa> => {
  const response = await http.get("/empresa/config");
  return response.data;
};

export const updateEmpresaConfigApi = async (data: Partial<Empresa>): Promise<Empresa> => {
  const response = await http.patch("/empresa/config", data);
  return response.data;
};
