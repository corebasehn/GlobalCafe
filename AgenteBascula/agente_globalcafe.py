"""
Agente Unificado Global Café (Báscula + Impresora Matricial)
Para la computadora de la caseta de pesaje.
Maneja la lectura por puerto serie (RS-232) de la báscula Toledo TC420
y el envío de boletas en modo RAW (ESC/P) a la impresora matricial Epson FX-890II.
"""

import serial
import serial.tools.list_ports
import time
import re
import threading
import sys
import os
import json
from datetime import datetime
from typing import Optional
from flask import Flask, jsonify, request
from flask_cors import CORS
import pystray
from PIL import Image, ImageDraw
import tkinter as tk
from tkinter import ttk, messagebox

import impresion_core

app = Flask(__name__)
CORS(app)

# ── Config persistente ────────────────────────────────────────────────────────
CONFIG_PATH = os.path.join(
    os.path.dirname(sys.executable if getattr(sys, "frozen", False) else __file__),
    "config.json"
)

def _cargar_config():
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}

def _guardar_config(data):
    try:
        actual = _cargar_config()
        actual.update(data)
        with open(CONFIG_PATH, "w", encoding="utf-8") as f:
            json.dump(actual, f, indent=2)
    except Exception as e:
        print(f"Error guardando config: {e}")

cfg = _cargar_config()
PUERTO_COM = cfg.get("puerto_com", "COM3")
IMPRESORA_CONFIG = cfg.get("impresora", "")
PUERTO_HTTP = cfg.get("puerto_http", 4000)

# ── Log de pesadas ────────────────────────────────────────────────────────────
LOG_DIR = r"C:\LogPesada"
os.makedirs(LOG_DIR, exist_ok=True)

def _registrar_pesada(peso: str, estado: str):
    ahora = datetime.now()
    nombre_archivo = os.path.join(LOG_DIR, ahora.strftime("%Y-%m-%d") + ".txt")
    linea = f"{ahora.strftime('%Y-%m-%d %H:%M:%S')} | Puerto: {PUERTO_COM} | Peso: {peso} | Estado: {estado}\n"
    try:
        with open(nombre_archivo, "a", encoding="utf-8") as f:
            f.write(linea)
    except Exception:
        pass

# ── Puerto serial de báscula ──────────────────────────────────────────────────
_puerto_actual: Optional[serial.Serial] = None
_swap_lock = threading.Lock()

def _abrir_puerto(timeout_serial=2) -> serial.Serial:
    global _puerto_actual
    with _swap_lock:
        if _puerto_actual and _puerto_actual.is_open:
            try:
                _puerto_actual.close()
            except Exception:
                pass
        p = serial.Serial(PUERTO_COM, baudrate=9600, bytesize=8, parity="N",
                          stopbits=1, timeout=timeout_serial)
        p.reset_input_buffer()
        p.read_until(b"\r")
        _puerto_actual = p
        return p

def _cerrar_puerto():
    global _puerto_actual
    with _swap_lock:
        if _puerto_actual and _puerto_actual.is_open:
            try:
                _puerto_actual.close()
            except Exception:
                pass
        _puerto_actual = None

def limpiar_datos_toledo(raw_data):
    try:
        texto = raw_data.decode("ascii", errors="ignore")
        match = re.search(r"\x02(.)\s{2}(\d{6})", texto)
        if match:
            estable = match.group(1) == "1"
            peso = int(match.group(2))
            if peso > 0:
                return str(peso), estable
        for n in re.findall(r"\d+\.\d+|\d+", texto):
            if len(n) > 2:
                return n, True
    except Exception:
        pass
    return None, False


# ── Endpoints Flask ───────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def estado_general():
    imp_activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG)
    return jsonify({
        "agente": "AgenteGlobalCafe",
        "version": "2.0.0",
        "estado": "online",
        "puerto_com": PUERTO_COM,
        "impresora_activa": imp_activa,
        "puerto_http": PUERTO_HTTP
    })


@app.route("/peso", methods=["GET"])
def obtener_peso():
    try:
        puerto = _abrir_puerto(timeout_serial=2)
        ultimo_peso = None
        for _ in range(5):
            raw_data = puerto.read_until(b"\r")
            peso, estable = limpiar_datos_toledo(raw_data)
            if peso and estable:
                _registrar_pesada(peso, "estable")
                return jsonify({"peso": peso, "estado": "exito"})
            if peso:
                ultimo_peso = peso
        if ultimo_peso:
            _registrar_pesada(ultimo_peso, "inestable")
            return jsonify({"peso": ultimo_peso, "estado": "exito", "nota": "peso inestable"})
        _registrar_pesada("0.00", "error-ilegible")
        return jsonify({"peso": "0.00", "estado": "error", "mensaje": "Datos ilegibles de la báscula"}), 500
    except serial.SerialException:
        _registrar_pesada("0.00", "error-puerto-desconectado")
        return jsonify({"peso": "0.00", "estado": "error", "mensaje": "Báscula desconectada o puerto ocupado"}), 500
    except Exception as e:
        _registrar_pesada("0.00", f"error-{str(e)}")
        return jsonify({"peso": "0.00", "estado": "error", "mensaje": str(e)}), 500
    finally:
        _cerrar_puerto()


@app.route("/impresoras", methods=["GET"])
def listar_impresoras_endpoint():
    instaladas = impresion_core.listar_impresoras()
    activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG)
    return jsonify({
        "impresoras": instaladas,
        "activa": activa
    })


@app.route("/config/impresora", methods=["POST"])
def configurar_impresora():
    global IMPRESORA_CONFIG
    data = request.get_json(force=True, silent=True) or {}
    nueva = (data.get("impresora") or "").strip()
    if not nueva:
        return jsonify({"estado": "error", "mensaje": "Nombre de impresora no especificado"}), 400
    IMPRESORA_CONFIG = nueva
    _guardar_config({"impresora": IMPRESORA_CONFIG})
    _actualizar_tooltip()
    return jsonify({
        "estado": "exito",
        "mensaje": f"Impresora configurada a '{IMPRESORA_CONFIG}'",
        "impresora": IMPRESORA_CONFIG
    })


@app.route("/imprimir", methods=["POST"])
def imprimir_documento():
    try:
        payload = request.get_json(force=True, silent=True) or {}
        tipo = payload.get("tipo", "boleta_pesada")
        es_copia = bool(payload.get("esCopia", False))
        datos = payload.get("datos", {})
        impresora_solicitada = payload.get("impresora") or IMPRESORA_CONFIG

        impresora_destino = impresion_core.obtener_impresora_activa(impresora_solicitada)
        if not impresora_destino:
            return jsonify({
                "estado": "error",
                "mensaje": "No se encontró ninguna impresora matricial instalada en Windows."
            }), 404

        if "rawText" in payload and payload["rawText"]:
            raw_bytes = impresion_core.init_boleta() + impresion_core.encode_cp850(payload["rawText"]) + impresion_core.ESC_FORM_FEED
        else:
            raw_bytes = impresion_core.generar_bytes_documento(tipo, datos, es_copia=es_copia)

        doc_titulo = f"GlobalCafe_{tipo}"
        impresion_core.enviar_raw(impresora_destino, raw_bytes, titulo_doc=doc_titulo)

        return jsonify({
            "estado": "exito",
            "mensaje": f"Documento '{tipo}' enviado a '{impresora_destino}'",
            "impresora": impresora_destino,
            "bytes_enviados": len(raw_bytes)
        })

    except Exception as e:
        print(f"Error imprimiendo: {e}")
        return jsonify({
            "estado": "error",
            "mensaje": str(e)
        }), 500


@app.route("/raw", methods=["GET"])
def ver_raw():
    lecturas = []
    try:
        puerto = _abrir_puerto(timeout_serial=2)
        time.sleep(0.1)
        for i in range(5):
            raw_data = puerto.read_until(b"\r")
            if not raw_data:
                lecturas.append({"linea": i + 1, "vacia": True})
                continue
            lecturas.append({
                "linea": i + 1,
                "longitud": len(raw_data),
                "bytes_hex": " ".join(f"{b:02X}" for b in raw_data),
                "bytes_dec": list(raw_data),
                "texto_ascii": raw_data.decode("ascii", errors="replace"),
                "texto_repr": repr(raw_data),
                "peso_extraido": limpiar_datos_toledo(raw_data)[0]
            })
        return jsonify({"puerto": PUERTO_COM, "lecturas": lecturas})
    except serial.SerialException as e:
        return jsonify({"error": "Puerto no disponible", "detalle": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        _cerrar_puerto()


# ── System Tray y Ventanas de Configuración ───────────────────────────────────
_tray_icon: Optional[pystray.Icon] = None

def _crear_icono_imagen():
    img = Image.new("RGB", (64, 64), color=(30, 30, 30))
    d = ImageDraw.Draw(img)
    # Círculo verde (báscula activa)
    d.ellipse([6, 6, 58, 58], fill=(0, 160, 70))
    # Balanza / indicador
    d.rectangle([28, 16, 36, 44], fill="white")
    d.rectangle([20, 38, 44, 44], fill="white")
    d.rectangle([14, 20, 50, 24], fill="white")
    return img

def _actualizar_tooltip():
    if _tray_icon:
        activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG) or "Auto"
        _tray_icon.title = f"Global Café (Caseta)\nBáscula: {PUERTO_COM}\nImpresora: {activa[:16]}\nPuerto: :{PUERTO_HTTP}"

def _abrir_dialogo_puerto(icon=None, item=None):
    global PUERTO_COM
    def _ejecutar():
        root = tk.Tk()
        root.title("Puerto COM Báscula")
        root.resizable(False, False)
        root.attributes("-topmost", True)
        w, h = 320, 160
        x = (root.winfo_screenwidth() - w) // 2
        y = (root.winfo_screenheight() - h) // 2
        root.geometry(f"{w}x{h}+{x}+{y}")

        tk.Label(root, text="Puerto COM Báscula (Toledo):", font=("Segoe UI", 9, "bold"), pady=10).pack()
        puertos = [p.device for p in serial.tools.list_ports.comports()]
        if PUERTO_COM not in puertos:
            puertos.insert(0, PUERTO_COM)
        combo = ttk.Combobox(root, values=puertos, width=20, font=("Segoe UI", 11))
        combo.set(PUERTO_COM)
        combo.pack(pady=5)

        def _guardar():
            global PUERTO_COM
            nuevo = combo.get().strip().upper()
            if not nuevo: return
            PUERTO_COM = nuevo
            _guardar_config({"puerto_com": PUERTO_COM})
            _actualizar_tooltip()
            messagebox.showinfo("Guardado", f"Puerto cambiado a {PUERTO_COM}", parent=root)
            root.destroy()

        tk.Button(root, text="Guardar", command=_guardar, bg="#0d6efd", fg="white", padx=20, pady=5).pack(pady=10)
        root.mainloop()
    threading.Thread(target=_ejecutar, daemon=True).start()

def _abrir_dialogo_impresora(icon=None, item=None):
    global IMPRESORA_CONFIG
    def _ejecutar():
        root = tk.Tk()
        root.title("Impresora Matricial (FX-890II)")
        root.resizable(False, False)
        root.attributes("-topmost", True)
        w, h = 380, 200
        x = (root.winfo_screenwidth() - w) // 2
        y = (root.winfo_screenheight() - h) // 2
        root.geometry(f"{w}x{h}+{x}+{y}")

        tk.Label(root, text="Seleccione la impresora matricial:", font=("Segoe UI", 9, "bold"), pady=10).pack()
        impresoras = impresion_core.listar_impresoras() or ["Sin impresoras"]
        combo = ttk.Combobox(root, values=impresoras, width=35, font=("Segoe UI", 10))
        activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG) or (impresoras[0] if impresoras else "")
        combo.set(activa)
        combo.pack(pady=5)

        def _guardar():
            global IMPRESORA_CONFIG
            nueva = combo.get().strip()
            if not nueva or nueva == "Sin impresoras": return
            IMPRESORA_CONFIG = nueva
            _guardar_config({"impresora": IMPRESORA_CONFIG})
            _actualizar_tooltip()
            messagebox.showinfo("Guardado", f"Impresora guardada:\n{IMPRESORA_CONFIG}", parent=root)
            root.destroy()

        def _probar():
            sel = combo.get().strip()
            try:
                b = impresion_core.generar_bytes_documento("test", {})
                impresion_core.enviar_raw(sel, b, "Test_FX890")
                messagebox.showinfo("Éxito", f"Prueba enviada a:\n{sel}", parent=root)
            except Exception as ex:
                messagebox.showerror("Error", f"Fallo al imprimir:\n{ex}", parent=root)

        btn_frame = tk.Frame(root)
        btn_frame.pack(pady=15)
        tk.Button(btn_frame, text="Probar Impresión", command=_probar, bg="#6c757d", fg="white", padx=10, pady=5).pack(side=tk.LEFT, padx=5)
        tk.Button(btn_frame, text="Guardar", command=_guardar, bg="#0d6efd", fg="white", padx=15, pady=5).pack(side=tk.LEFT, padx=5)

        root.mainloop()
    threading.Thread(target=_ejecutar, daemon=True).start()

def _salir(icon, item):
    icon.stop()
    sys.exit(0)

def _iniciar_tray():
    global _tray_icon
    activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG) or "Auto"
    _tray_icon = pystray.Icon(
        "GlobalCafeAgent",
        _crear_icono_imagen(),
        f"Global Café (Caseta)\nBáscula: {PUERTO_COM}\nImpresora: {activa[:16]}\nPuerto: :{PUERTO_HTTP}",
        menu=pystray.Menu(
            pystray.MenuItem("Global Café - Caseta de Báscula", None, enabled=False),
            pystray.MenuItem(lambda item: f"Báscula: {PUERTO_COM}", None, enabled=False),
            pystray.MenuItem(lambda item: f"Impresora: {impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG) or 'Ninguna'}", None, enabled=False),
            pystray.Menu.SEPARATOR,
            pystray.MenuItem("Cambiar puerto COM Báscula...", _abrir_dialogo_puerto),
            pystray.MenuItem("Cambiar Impresora Matricial...", _abrir_dialogo_impresora),
            pystray.Menu.SEPARATOR,
            pystray.MenuItem("Cerrar Agente", _salir),
        )
    )
    _tray_icon.run()

if __name__ == "__main__":
    print(f"Iniciando Agente Unificado Global Café en http://127.0.0.1:{PUERTO_HTTP}...")
    flask_thread = threading.Thread(
        target=lambda: app.run(host="0.0.0.0", port=PUERTO_HTTP, debug=False, use_reloader=False),
        daemon=True
    )
    flask_thread.start()

    _iniciar_tray()
