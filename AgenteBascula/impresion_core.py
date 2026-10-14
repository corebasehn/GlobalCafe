"""
Módulo Core de Impresión Matricial (ESC/P) para Epson FX-890II y compatibles.
Maneja la detección de impresoras en Windows, envío de datos RAW al spooler
y generación de formatos de boletas optimizados para papel continuo de 80 columnas.
"""

import sys
import os
import re
from datetime import datetime
from typing import List, Dict, Any, Optional

try:
    import win32print
except ImportError:
    win32print = None

# Comandos ESC/P para Epson FX-890II
ESC_RESET = b"\x1b@"                    # Inicializar impresora
ESC_DRAFT = b"\x1bx\x00"                # Modo borrador alta velocidad (Draft)
ESC_CP850 = b"\x1bt\x01"                # Tabla de caracteres 1 (PC850 Multilingual / Latin)
ESC_SPACING_6LPI = b"\x1b2"             # Interlineado de 1/6 pulgada (6 líneas por pulgada)
ESC_PAGE_33 = b"\x1bC\x21"              # Largo de página: 33 líneas (5.5 pulgadas / Media Carta)
ESC_PAGE_66 = b"\x1bC\x42"              # Largo de página: 66 líneas (11 pulgadas / Carta Completa)
ESC_BOLD_ON = b"\x1bE"                  # Negrita ON
ESC_BOLD_OFF = b"\x1bF"                 # Negrita OFF
ESC_COND_ON = b"\x0f"                   # Condensado ON (17 CPI, hasta 136 caracteres/línea)
ESC_COND_OFF = b"\x12"                  # Condensado OFF (10 CPI, 80 caracteres/línea)
ESC_UNDERLINE_ON = b"\x1b-\x01"         # Subrayado ON
ESC_UNDERLINE_OFF = b"\x1b-\x00"        # Subrayado OFF
ESC_FORM_FEED = b"\x0c"                 # Avance al corte de página (Form Feed)

ANCHO_ESTANDAR = 80                     # 80 columnas para hojas estándar de carro angosto


def encode_cp850(texto: str) -> bytes:
    """Codifica texto a página de código CP850 (compatible con español y tildes en Epson)."""
    if not texto:
        return b""
    # Reemplazos amigables si algún caracter unicode no existe en CP850
    reemplazos = {
        "—": "-",
        "–": "-",
        "“": '"',
        "”": '"',
        "’": "'",
        "•": "*",
        "…": "...",
    }
    for orig, rep in reemplazos.items():
        texto = texto.replace(orig, rep)
    return texto.encode("cp850", errors="replace")


def centrar(texto: str, ancho: int = ANCHO_ESTANDAR) -> str:
    """Centra un texto dentro de un ancho determinado."""
    return texto.strip().center(ancho)


def dos_columnas(izq: str, der: str, ancho: int = ANCHO_ESTANDAR) -> str:
    """Formatea dos cadenas alineadas a los extremos izquierdo y derecho."""
    espacios = ancho - len(izq) - len(der)
    if espacios < 1:
        # Si se pasa del ancho, recorta el lado izquierdo
        izq = izq[:ancho - len(der) - 1]
        espacios = 1
    return izq + (" " * espacios) + der


def fmt_numero(num: Any, decimales: int = 2) -> str:
    """Formatea un número con separadores de miles y decimales."""
    if num is None or num == "":
        return "0.00"
    try:
        val = float(num)
        return f"{val:,.{decimales}f}"
    except (ValueError, TypeError):
        return str(num)


def fmt_fecha(fecha_str: Any) -> str:
    """Formatea fecha a dd/mm/aaaa hh:mm."""
    if not fecha_str:
        return datetime.now().strftime("%d/%m/%Y %H:%M")
    if isinstance(fecha_str, datetime):
        return fecha_str.strftime("%d/%m/%Y %H:%M")
    try:
        # Intenta parsear ISO
        dt = datetime.fromisoformat(str(fecha_str).replace("Z", "+00:00"))
        return dt.strftime("%d/%m/%Y %H:%M")
    except Exception:
        return str(fecha_str)[:16]


# ─────────────────────────────────────────────────────────────────────────────
# GESTIÓN DE IMPRESORAS DE WINDOWS
# ─────────────────────────────────────────────────────────────────────────────

def listar_impresoras() -> List[str]:
    """Obtiene la lista de todas las impresoras instaladas en Windows."""
    if not win32print:
        return []
    try:
        flags = win32print.PRINTER_ENUM_LOCAL | win32print.PRINTER_ENUM_CONNECTIONS
        printers = win32print.EnumPrinters(flags)
        return [p[2] for p in printers]
    except Exception as e:
        print(f"Error listando impresoras: {e}")
        return []


def obtener_impresora_activa(preferida: Optional[str] = None) -> Optional[str]:
    """
    Determina la impresora a utilizar según la prioridad:
    1. Impresora pasada por parámetro o configuración.
    2. Impresora cuyo nombre contenga 'FX-890', 'FX890' o 'EPSON'.
    3. Impresora predeterminada de Windows.
    """
    if not win32print:
        return None

    instaladas = listar_impresoras()
    if not instaladas:
        return None

    # 1. Si se especificó una preferida (por config.json o por petición web)
    if preferida:
        for p in instaladas:
            if preferida.lower() in p.lower():
                return p

    # 2. Impresora predeterminada de Windows
    try:
        default = win32print.GetDefaultPrinter()
        if default in instaladas:
            return default
    except Exception:
        pass

    # 3. Buscar automáticamente alguna matricial instalada (Epson FX/LX/LQ, Oki, Citizen, Genérica)
    palabras_clave = ("fx", "lx", "lq", "epson", "oki", "citizen", "matricial", "generic", "pos")
    for p in instaladas:
        p_lower = p.lower()
        if any(k in p_lower for k in palabras_clave):
            return p

    return instaladas[0] if instaladas else None


def enviar_raw(nombre_impresora: str, datos: bytes, titulo_doc: str = "Boleta GlobalCafe") -> bool:
    """Envía un flujo de bytes RAW directamente al spooler de la impresora de Windows."""
    if not win32print:
        raise RuntimeError("El módulo win32print no está disponible en este sistema.")

    h_printer = None
    try:
        h_printer = win32print.OpenPrinter(nombre_impresora)
        # Tipo de datos "RAW" envía los bytes directo sin procesar por el driver gráfico
        job_info = (titulo_doc, None, "RAW")
        h_doc = win32print.StartDocPrinter(h_printer, 1, job_info)
        win32print.StartPagePrinter(h_printer)
        win32print.WritePrinter(h_printer, datos)
        win32print.EndPagePrinter(h_printer)
        win32print.EndDocPrinter(h_printer)
        return True
    finally:
        if h_printer:
            try:
                win32print.ClosePrinter(h_printer)
            except Exception:
                pass


# ─────────────────────────────────────────────────────────────────────────────
# FORMATEADORES DE BOLETAS (ESC/P)
# ─────────────────────────────────────────────────────────────────────────────

def init_boleta(media_carta: bool = True) -> bytes:
    """Inicializa la impresora con configuración para boleta continua."""
    buf = bytearray()
    buf.extend(ESC_RESET)
    buf.extend(ESC_CP850)
    buf.extend(ESC_DRAFT)
    buf.extend(ESC_SPACING_6LPI)
    if media_carta:
        buf.extend(ESC_PAGE_33)  # 33 líneas = 5.5 pulgadas
    else:
        buf.extend(ESC_PAGE_66)  # 66 líneas = 11 pulgadas
    return bytes(buf)


def construir_boleta_pesada(data: Dict[str, Any], es_primera: bool = False, es_copia: bool = False) -> bytes:
    """
    Construye el documento ESC/P para Boleta de 1ª o 2ª Pesada.
    Diseñado para media carta (33 líneas), ancho de 80 columnas.
    """
    detalle = data.get("detalle", data)
    recepcion = detalle.get("recepcion", {})
    devolucion = data.get("devolucion")

    buf = bytearray()
    buf.extend(init_boleta(media_carta=True))

    # ENCABEZADO
    buf.extend(ESC_BOLD_ON)
    titulo = "BOLETA DE PRIMERA PESADA" if es_primera else "BOLETA DE SEGUNDA PESADA"
    buf.extend(encode_cp850(centrar("GLOBAL CAFE S.A.") + "\r\n"))
    buf.extend(encode_cp850(centrar(titulo) + "\r\n"))
    if es_copia:
        buf.extend(encode_cp850(centrar("*** COPIA ***") + "\r\n"))
    buf.extend(ESC_BOLD_OFF)

    # INFORMACIÓN GENERAL (en 2 columnas)
    no_entrada = recepcion.get("numero_entrada", "—")
    cosecha = recepcion.get("cosecha", {}).get("cosecha", "—") if isinstance(recepcion.get("cosecha"), dict) else str(recepcion.get("cosecha") or "—")
    fecha_hoy = fmt_fecha(datetime.now())
    cliente = detalle.get("proveedor", {}).get("nombre", "—") if isinstance(detalle.get("proveedor"), dict) else str(detalle.get("proveedor") or "—")
    remision = detalle.get("remision", "—")
    
    placa_cab = recepcion.get("placa_cabezal", {}).get("placa", "—") if isinstance(recepcion.get("placa_cabezal"), dict) else str(recepcion.get("placa_cabezal") or "—")
    placa_fur = recepcion.get("placa_furgon", {}).get("placa") if isinstance(recepcion.get("placa_furgon"), dict) else recepcion.get("placa_furgon")
    placa_completa = f"{placa_cab} / {placa_fur}" if placa_fur else placa_cab

    conductor = recepcion.get("conductor", {}).get("nombre", "—") if isinstance(recepcion.get("conductor"), dict) else str(recepcion.get("conductor") or "—")
    telefono = recepcion.get("conductor", {}).get("telefono", "—") if isinstance(recepcion.get("conductor"), dict) else str(recepcion.get("conductor_telefono") or "—")
    observaciones = detalle.get("observaciones") or recepcion.get("observaciones") or "—"

    col1_w = 40
    def fila_2col(l1, v1, l2, v2):
        c1 = f"{l1:<13} {str(v1)[:24]:<24}"
        c2 = f"{l2:<11} {str(v2)[:26]:<26}"
        return f"{c1} {c2}\r\n"

    buf.extend(encode_cp850(fila_2col("# RECEPCION:", no_entrada, "COSECHA:", cosecha)))
    buf.extend(encode_cp850(fila_2col("FECHA:", fecha_hoy, "CLIENTE:", cliente)))
    buf.extend(encode_cp850(fila_2col("REMISION:", remision, "PLACA:", placa_completa)))
    buf.extend(encode_cp850(fila_2col("CONDUCTOR:", conductor, "TELEFONO:", telefono)))
    buf.extend(encode_cp850(f"{'OBSERVACION:':<13} {str(observaciones)[:64]}\r\n"))

    # CAFÉ EXTERNO
    id_tipo_remision = detalle.get("id_tipo_remision")
    if not es_primera and id_tipo_remision == 2:
        buf.extend(ESC_BOLD_ON)
        buf.extend(encode_cp850(centrar("[ CAFE EXTERNO (SERVICIO DE MAQUILADO) ]") + "\r\n"))
        buf.extend(ESC_BOLD_OFF)

    # TIPO DE CAFÉ
    tipo_cafe = detalle.get("tipo_cafe", {}).get("tipo_cafe", "N/A") if isinstance(detalle.get("tipo_cafe"), dict) else str(detalle.get("tipo_cafe") or "N/A")
    buf.extend(ESC_BOLD_ON)
    buf.extend(encode_cp850(f"TIPO: {tipo_cafe.upper()}\r\n"))
    buf.extend(ESC_BOLD_OFF)

    # TABLA DE MEDICIONES DE PESO
    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
    buf.extend(ESC_BOLD_ON)
    buf.extend(encode_cp850(f"{'MEDICION':<25} {'PESO (LB)':>15} {'SACOS':>10}   {'FECHA / HORA':<25}\r\n"))
    buf.extend(ESC_BOLD_OFF)
    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))

    sacos_iniciales = (detalle.get("cantidad_sacos") or 0) + ((devolucion.get("cantidad_sacos") or 0) if devolucion else 0)
    peso_entrada = detalle.get("pesada_entrada")
    fecha_entrada = fmt_fecha(detalle.get("fecha_entrada_bascula"))

    # Fila Peso Inicial
    txt_peso_ini = "******" if es_primera else (f"+{fmt_numero(peso_entrada)}" if peso_entrada else "—")
    buf.extend(encode_cp850(f"{'PESO INICIAL':<25} {txt_peso_ini:>15} {f'+{sacos_iniciales}':>10}   {fecha_entrada:<25}\r\n"))

    # Cambios de cabezal si aplican
    cambios = detalle.get("cambios_cabezal", [])
    for c in cambios:
        if c.get("peso_cabezal_entrante") is not None:
            p_sal = c.get("peso_cabezal_saliente")
            p_ent = c.get("peso_cabezal_entrante")
            f_sal = fmt_fecha(c.get("fecha_creacion"))
            f_ent = fmt_fecha(c.get("fecha_modificacion"))
            buf.extend(encode_cp850(f"{'CABEZAL INICIAL':<25} {f'-{fmt_numero(p_sal)}':>15} {'0':>10}   {f_sal:<25}\r\n"))
            buf.extend(encode_cp850(f"{'CABEZAL FINAL':<25} {f'+{fmt_numero(p_ent)}':>15} {'0':>10}   {f_ent:<25}\r\n"))

    peso_bruto = float(peso_entrada) if peso_entrada else 0.0
    total_sacos = int(sacos_iniciales)

    # Fila Peso Final (si es segunda pesada)
    if not es_primera:
        peso_salida = detalle.get("pesada_salida")
        fecha_salida = fmt_fecha(detalle.get("fecha_salida_bascula"))
        sacos_dev = devolucion.get("cantidad_sacos", 0) if devolucion else 0
        buf.extend(encode_cp850(f"{'PESO FINAL':<25} {f'-{fmt_numero(peso_salida)}':>15} {f'-{sacos_dev}':>10}   {fecha_salida:<25}\r\n"))

    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))

    # TOTALES Y RESUMEN
    buf.extend(ESC_BOLD_ON)
    if es_primera:
        buf.extend(encode_cp850(f"PESO BRUTO: ****** LB       TOTAL SACOS: {total_sacos}\r\n"))
    else:
        peso_salida_val = float(detalle.get("pesada_salida") or 0.0)
        peso_bruto_neto = peso_bruto - peso_salida_val
        tara_unitaria = float(detalle.get("tipo_empaque", {}).get("tara", 0.5) if isinstance(detalle.get("tipo_empaque"), dict) else 0.5)
        tara_total = tara_unitaria * total_sacos
        q_neto = (peso_bruto_neto - tara_total) / 100.0 if peso_bruto_neto else 0.0
        peso_remision = float(detalle.get("cantidad_qq") or 0.0) * 100.0
        diferencia = peso_bruto_neto - peso_remision if peso_remision else 0.0

        linea_tot1 = f"PESO BRUTO: {fmt_numero(peso_bruto_neto):>10} LB   TOTAL SACOS: {total_sacos:<6}   PESO REMISION: {fmt_numero(peso_remision)} LB"
        linea_tot2 = f"TARA EMPAQUE: {fmt_numero(tara_total):>8} LB   QQ NETO TOTAL: {fmt_numero(q_neto):<6}   DIFERENCIA: {fmt_numero(diferencia)} LB"
        buf.extend(encode_cp850(linea_tot1 + "\r\n"))
        buf.extend(encode_cp850(linea_tot2 + "\r\n"))
    buf.extend(ESC_BOLD_OFF)

    # FIRMAS Y PIE
    buf.extend(encode_cp850("\r\n"))
    buf.extend(encode_cp850(dos_columnas("Firma Basculero: _____________________", "Firma Conductor: _____________________") + "\r\n"))

    # FORM FEED (avanza el papel a la siguiente perforación)
    buf.extend(ESC_FORM_FEED)
    return bytes(buf)


def construir_boleta_recepcion(data: Dict[str, Any], es_copia: bool = False) -> bytes:
    """
    Construye el documento ESC/P para Boleta de Recepción / Remisión (Ingreso Portería).
    """
    buf = bytearray()
    buf.extend(init_boleta(media_carta=True))

    buf.extend(ESC_BOLD_ON)
    buf.extend(encode_cp850(centrar("GLOBAL CAFE S.A.") + "\r\n"))
    buf.extend(encode_cp850(centrar("BOLETA DE INGRESO / RECEPCION") + "\r\n"))
    if es_copia:
        buf.extend(encode_cp850(centrar("*** COPIA ***") + "\r\n"))
    buf.extend(ESC_BOLD_OFF)

    no_entrada = data.get("numero_entrada", "—")
    fecha_ent = fmt_fecha(data.get("fecha_entrada"))
    conductor = data.get("conductor", {}).get("nombre", "—") if isinstance(data.get("conductor"), dict) else str(data.get("conductor") or "—")
    transporte = data.get("conductor", {}).get("transporte", {}).get("nombre", "—") if isinstance(data.get("conductor"), dict) and isinstance(data.get("conductor").get("transporte"), dict) else "—"

    cabezal = data.get("placa_cabezal", {}).get("placa", "—") if isinstance(data.get("placa_cabezal"), dict) else str(data.get("placa_cabezal") or "—")
    furgon = data.get("placa_furgon", {}).get("placa") if isinstance(data.get("placa_furgon"), dict) else data.get("placa_furgon")
    placas = f"{cabezal} / {furgon}" if furgon else cabezal

    muni = data.get("municipio", {})
    origen = muni.get("nombre", "—") if isinstance(muni, dict) else str(muni or "—")
    cosecha = data.get("cosecha", {}).get("cosecha", "—") if isinstance(data.get("cosecha"), dict) else str(data.get("cosecha") or "—")
    marchamos = data.get("marchamo", "—")
    obs = data.get("observaciones", "—")

    def fila_2col(l1, v1, l2, v2):
        c1 = f"{l1:<13} {str(v1)[:24]:<24}"
        c2 = f"{l2:<11} {str(v2)[:26]:<26}"
        return f"{c1} {c2}\r\n"

    buf.extend(encode_cp850(fila_2col("# RECEPCION:", no_entrada, "FECHA:", fecha_ent)))
    buf.extend(encode_cp850(fila_2col("TRANSPORTE:", transporte, "PLACAS:", placas)))
    buf.extend(encode_cp850(fila_2col("CONDUCTOR:", conductor, "ORIGEN:", origen)))
    buf.extend(encode_cp850(fila_2col("MARCHAMOS:", marchamos, "COSECHA:", cosecha)))
    if obs and obs != "—":
        buf.extend(encode_cp850(f"{'OBSERVACION:':<13} {str(obs)[:64]}\r\n"))

    # TABLA DE DETALLES
    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
    buf.extend(ESC_BOLD_ON)
    buf.extend(encode_cp850(f"{'REMISION':<12} {'PROVEEDOR':<28} {'TIPO CAFE':<18} {'SACOS':>8} {'QQ':>10}\r\n"))
    buf.extend(ESC_BOLD_OFF)
    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))

    detalles = data.get("detalles", [])
    total_sacos = 0
    total_qq = 0.0

    for d in detalles:
        rem = str(d.get("remision", "—"))[:11]
        prov = d.get("proveedor", {}).get("nombre", "—") if isinstance(d.get("proveedor"), dict) else str(d.get("proveedor") or "—")
        prov = prov[:27]
        tipo = d.get("tipo_cafe", {}).get("tipo_cafe", "—") if isinstance(d.get("tipo_cafe"), dict) else str(d.get("tipo_cafe") or "—")
        tipo = tipo[:17]
        sacos = int(d.get("cantidad_sacos") or 0)
        qq = float(d.get("cantidad_qq") or 0.0)

        total_sacos += sacos
        total_qq += qq

        buf.extend(encode_cp850(f"{rem:<12} {prov:<28} {tipo:<18} {sacos:>8} {fmt_numero(qq):>10}\r\n"))

    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
    buf.extend(ESC_BOLD_ON)
    buf.extend(encode_cp850(dos_columnas(f"TOTAL SACOS: {total_sacos}", f"TOTAL QUINTALES: {fmt_numero(total_qq)} QQ") + "\r\n"))
    buf.extend(ESC_BOLD_OFF)

    buf.extend(encode_cp850("\r\n"))
    buf.extend(encode_cp850(dos_columnas("Firma Receptor / Portería: ________________", "Firma Transportista: ________________") + "\r\n"))

    buf.extend(ESC_FORM_FEED)
    return bytes(buf)


def construir_pase_salida(data: Dict[str, Any]) -> bytes:
    """
    Construye el documento ESC/P para Pase de Salida de Báscula.
    """
    detalle = data.get("detalle", data)
    recepcion = detalle.get("recepcion", {})

    buf = bytearray()
    buf.extend(init_boleta(media_carta=True))

    buf.extend(ESC_BOLD_ON)
    buf.extend(encode_cp850(centrar("GLOBAL CAFE S.A.") + "\r\n"))
    buf.extend(encode_cp850(centrar("PASE DE SALIDA DE BASCULA") + "\r\n"))
    buf.extend(encode_cp850(centrar("Autorizacion de Salida del Recinto") + "\r\n"))
    buf.extend(ESC_BOLD_OFF)
    buf.extend(encode_cp850(dos_columnas("", f"Emitido: {fmt_fecha(datetime.now())}") + "\r\n"))

    no_entrada = recepcion.get("numero_entrada", "—")
    cliente = detalle.get("proveedor", {}).get("nombre", "—") if isinstance(detalle.get("proveedor"), dict) else str(detalle.get("proveedor") or "—")
    tipo_vehiculo = recepcion.get("tipo_vehiculo", "—")
    cabezal = recepcion.get("placa_cabezal", {}).get("placa", "—") if isinstance(recepcion.get("placa_cabezal"), dict) else str(recepcion.get("placa_cabezal") or "—")
    
    es_destarse = detalle.get("estado_transaccion", {}).get("nombre") == "Sin Cabezal"
    if es_destarse:
        furgon = "DESACOPLADO"
    else:
        furgon = recepcion.get("placa_furgon", {}).get("placa", "—") if isinstance(recepcion.get("placa_furgon"), dict) else str(recepcion.get("placa_furgon") or "—")

    conductor = recepcion.get("conductor", {}).get("nombre", "—") if isinstance(recepcion.get("conductor"), dict) else str(recepcion.get("conductor") or "—")
    transporte = recepcion.get("conductor", {}).get("transporte", {}).get("nombre", "Particular") if isinstance(recepcion.get("conductor"), dict) and isinstance(recepcion.get("conductor").get("transporte"), dict) else "Particular"

    obs = "SALE POR DESACOPLO DEL FURGON" if es_destarse else (detalle.get("observaciones") or recepcion.get("observaciones") or "Sin observaciones.")

    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
    buf.extend(encode_cp850(f"{'# RECEPCION:':<15} {str(no_entrada):<24} {'FECHA Y HORA:':<15} {fmt_fecha(datetime.now()):<24}\r\n"))
    buf.extend(encode_cp850(f"{'CLIENTE/PROV:':<15} {str(cliente)[:24]:<24} {'TIPO VEHICULO:':<15} {str(tipo_vehiculo)[:24]:<24}\r\n"))
    buf.extend(encode_cp850(f"{'PLACA CABEZAL:':<15} {str(cabezal):<24} {'PLACA FURGON:':<15} {str(furgon):<24}\r\n"))
    buf.extend(encode_cp850(f"{'CONDUCTOR:':<15} {str(conductor)[:24]:<24} {'TRANSPORTE:':<15} {str(transporte)[:24]:<24}\r\n"))
    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
    buf.extend(encode_cp850(f"OBSERVACIONES: {str(obs)[:63]}\r\n\r\n"))

    # 3 Firmas
    buf.extend(encode_cp850(f"{'HECHO POR':^26} {'AUTORIZADO POR':^26} {'FIRMA MOTORISTA':^26}\r\n\r\n\r\n"))
    buf.extend(encode_cp850(f"{'_____________________':^26} {'_____________________':^26} {'_____________________':^26}\r\n"))

    buf.extend(ESC_FORM_FEED)
    return bytes(buf)


def construir_boleta_devolucion(data: Dict[str, Any], es_copia: bool = False) -> bytes:
    """
    Construye el documento ESC/P para Boleta de Devolución / Rechazo de Café.
    """
    recepcion = data.get("recepcion", {})
    analisis = (data.get("analisis_calidad") or [{}])[0]

    buf = bytearray()
    buf.extend(init_boleta(media_carta=True))

    buf.extend(ESC_BOLD_ON)
    buf.extend(encode_cp850(centrar("GLOBAL CAFE S.A.") + "\r\n"))
    buf.extend(encode_cp850(centrar("BOLETA DE RECHAZO / DEVOLUCION DE CAFE") + "\r\n"))
    if es_copia:
        buf.extend(encode_cp850(centrar("*** COPIA ***") + "\r\n"))
    buf.extend(ESC_BOLD_OFF)

    no_entrada = recepcion.get("numero_entrada", "—")
    remision = data.get("remision", "—")
    cliente = data.get("proveedor", {}).get("nombre", "—") if isinstance(data.get("proveedor"), dict) else str(data.get("proveedor") or "—")
    sacos = data.get("cantidad_sacos", 0)
    qq = data.get("cantidad_qq", 0)

    motivo = analisis.get("observaciones") or data.get("observaciones") or "No se especificaron detalles adicionales."

    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
    buf.extend(encode_cp850(f"{'# RECEPCION:':<15} {str(no_entrada):<24} {'FECHA RECHAZO:':<15} {fmt_fecha(analisis.get('fecha_analisis')):<24}\r\n"))
    buf.extend(encode_cp850(f"{'REMISION:':<15} {str(remision):<24} {'CLIENTE/PROV:':<15} {str(cliente)[:24]:<24}\r\n"))
    buf.extend(encode_cp850(f"{'SACOS DEVUELTOS:':<15} {str(sacos):<24} {'QQ DEVUELTOS:':<15} {fmt_numero(qq):<24}\r\n"))
    buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
    buf.extend(ESC_BOLD_ON)
    buf.extend(encode_cp850(f"MOTIVO DEVOLUCION / RECHAZO:\r\n"))
    buf.extend(ESC_BOLD_OFF)
    buf.extend(encode_cp850(f"{str(motivo)[:150]}\r\n\r\n"))

    buf.extend(encode_cp850(f"{'Firma Catacion/Calidad':^38} {'Firma Transportista/Cliente':^38}\r\n\r\n\r\n"))
    buf.extend(encode_cp850(f"{'___________________________':^38} {'___________________________':^38}\r\n"))

    buf.extend(ESC_FORM_FEED)
    return bytes(buf)


def generar_bytes_documento(tipo: str, datos: Dict[str, Any], es_copia: bool = False) -> bytes:
    """Enruta y genera el flujo de bytes ESC/P según el tipo de documento."""
    t = tipo.lower().strip()
    if t in ("boleta_pesada_primera", "primera", "primera_pesada"):
        return construir_boleta_pesada(datos, es_primera=True, es_copia=es_copia)
    elif t in ("boleta_pesada_segunda", "segunda", "segunda_pesada", "boleta_pesada"):
        return construir_boleta_pesada(datos, es_primera=False, es_copia=es_copia)
    elif t in ("boleta_recepcion", "remision", "ingreso"):
        return construir_boleta_recepcion(datos, es_copia=es_copia)
    elif t in ("pase_salida", "salida"):
        return construir_pase_salida(datos)
    elif t in ("boleta_devolucion", "devolucion"):
        return construir_boleta_devolucion(datos, es_copia=es_copia)
    elif t == "test":
        # Prueba de impresión de agujas e interlineado
        buf = bytearray()
        buf.extend(init_boleta(media_carta=True))
        buf.extend(ESC_BOLD_ON)
        buf.extend(encode_cp850(centrar("TEST DE IMPRESION EPSON FX-890II") + "\r\n"))
        buf.extend(encode_cp850(centrar("GLOBAL CAFE S.A.") + "\r\n"))
        buf.extend(ESC_BOLD_OFF)
        buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
        buf.extend(encode_cp850("Prueba de caracteres espanoles: a e i o u A E I O U n N\r\n"))
        buf.extend(encode_cp850(f"Fecha y Hora: {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\r\n"))
        buf.extend(encode_cp850("Impresion matricial directa en modo RAW / ESC-P OK!\r\n"))
        buf.extend(encode_cp850("-" * ANCHO_ESTANDAR + "\r\n"))
        buf.extend(ESC_FORM_FEED)
        return bytes(buf)
    else:
        raise ValueError(f"Tipo de documento no reconocido: {tipo}")
