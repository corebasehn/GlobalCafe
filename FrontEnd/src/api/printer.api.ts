import {
  getBoletaPesadaApi,
  getBoletaRecepcionApi,
  getBoletaDevolucionApi,
} from "./reception.api";

export const AGENT_PRINTER_URL = "http://127.0.0.1:4000";

export interface PrintResult {
  success: boolean;
  message: string;
  impresora?: string;
  fallbackNeeded?: boolean;
}

/**
 * Comprueba si el Agente de Impresión Matricial está activo en http://127.0.0.1:4000
 */
export async function checkPrinterAgent(): Promise<{ online: boolean; impresora?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${AGENT_PRINTER_URL}/impresoras`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return { online: false };
    const data = await res.json();
    return { online: true, impresora: data.activa };
  } catch {
    return { online: false };
  }
}

/**
 * Obtiene la lista completa de impresoras instaladas en Windows en esta PC
 */
export async function obtenerImpresorasDisponibles(): Promise<{
  online: boolean;
  impresoras: string[];
  activa: string;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${AGENT_PRINTER_URL}/impresoras`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) return { online: false, impresoras: [], activa: "" };
    const data = await res.json();
    const guardada = localStorage.getItem("globalcafe_impresora_matricial");
    return {
      online: true,
      impresoras: data.impresoras || [],
      activa: guardada || data.activa || "",
    };
  } catch {
    return { online: false, impresoras: [], activa: "" };
  }
}

/**
 * Guarda la impresora seleccionada en el agente local y en el navegador
 */
export async function guardarImpresoraConfig(nombre: string): Promise<boolean> {
  localStorage.setItem("globalcafe_impresora_matricial", nombre);
  try {
    const res = await fetch(`${AGENT_PRINTER_URL}/config/impresora`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ impresora: nombre }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Envía datos de documento al Agente Local para impresión directa en modo RAW (ESC/P)
 */
export async function enviarImpresionMatricial(
  tipo: string,
  datos: any,
  esCopia: boolean = false
): Promise<PrintResult> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);
  const impresoraGuardada = localStorage.getItem("globalcafe_impresora_matricial") || undefined;

  try {
    const response = await fetch(`${AGENT_PRINTER_URL}/imprimir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo,
        esCopia,
        datos,
        impresora: impresoraGuardada,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const json = await response.json();
    if (response.ok && json.estado === "exito") {
      return {
        success: true,
        message: json.mensaje || "Impresión enviada correctamente",
        impresora: json.impresora,
      };
    } else {
      return {
        success: false,
        message: json.mensaje || "Error en el agente de impresión",
        fallbackNeeded: false,
      };
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    const esTimeout = error.name === "AbortError";
    return {
      success: false,
      message: esTimeout
        ? "El agente de impresión tardó más de 6 segundos en responder."
        : "No se pudo conectar con el Agente de Impresión en esta PC (127.0.0.1:4000).",
      fallbackNeeded: true,
    };
  }
}

/**
 * Imprime Boleta de 1ª o 2ª Pesada en la matricial Epson FX-890II
 */
export async function imprimirMatricialPesada(
  idDetalle: number,
  tipo: "primera" | "segunda",
  esCopia: boolean = false
): Promise<PrintResult> {
  try {
    const data = await getBoletaPesadaApi(idDetalle);
    return await enviarImpresionMatricial(`boleta_pesada_${tipo}`, data, esCopia);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al obtener datos de la pesada.",
      fallbackNeeded: false,
    };
  }
}

/**
 * Imprime Boleta de Recepción / Remisión en la matricial Epson FX-890II
 */
export async function imprimirMatricialRecepcion(
  idRecepcion: number,
  esCopia: boolean = false
): Promise<PrintResult> {
  try {
    const data = await getBoletaRecepcionApi(idRecepcion);
    return await enviarImpresionMatricial("boleta_recepcion", data, esCopia);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al obtener datos de la recepción.",
      fallbackNeeded: false,
    };
  }
}

/**
 * Imprime Pase de Salida de Báscula en la matricial Epson FX-890II
 */
export async function imprimirMatricialPaseSalida(
  idDetalle: number
): Promise<PrintResult> {
  try {
    const data = await getBoletaPesadaApi(idDetalle);
    return await enviarImpresionMatricial("pase_salida", data, false);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al obtener datos del pase de salida.",
      fallbackNeeded: false,
    };
  }
}

/**
 * Imprime Boleta de Devolución en la matricial Epson FX-890II
 */
export async function imprimirMatricialDevolucion(
  idDetalleDevolucion: number,
  esCopia: boolean = false
): Promise<PrintResult> {
  try {
    const data = await getBoletaDevolucionApi(idDetalleDevolucion);
    return await enviarImpresionMatricial("boleta_devolucion", data, esCopia);
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Error al obtener datos de devolución.",
      fallbackNeeded: false,
    };
  }
}
