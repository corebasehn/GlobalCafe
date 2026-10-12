"""
Agente de Impresión Matricial (Global Café) - Versión Standalone
Para computadoras de Recepción, Portería u Oficina (sin báscula).
Crea un servidor local en el puerto 4000 para recibir órdenes de impresión
desde el navegador y enviarlas directamente a la Epson FX-890II vía modo RAW (ESC/P).
"""

import sys
import os
import json
import threading
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

# ── Configuración persistente ──────────────────────────────────────────────────
CONFIG_PATH = os.path.join(
    os.path.dirname(sys.executable if getattr(sys, "frozen", False) else __file__),
    "config.json"
)


def _cargar_config() -> dict:
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def _guardar_config(data: dict):
    try:
        actual = _cargar_config()
        actual.update(data)
        with open(CONFIG_PATH, "w", encoding="utf-8") as f:
            json.dump(actual, f, indent=2)
    except Exception as e:
        print(f"Error guardando config: {e}")


cfg = _cargar_config()
IMPRESORA_CONFIG = cfg.get("impresora", "")
PUERTO_HTTP = cfg.get("puerto_http", 4000)

_tray_icon: Optional[pystray.Icon] = None


# ── Endpoints Flask ────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def estado_agente():
    activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG)
    return jsonify({
        "agente": "AgenteImpresion",
        "version": "1.0.0",
        "estado": "online",
        "impresora_activa": activa,
        "impresora_configurada": IMPRESORA_CONFIG or "AUTO"
    })


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

        # 1. Obtener la impresora destino
        impresora_destino = impresion_core.obtener_impresora_activa(impresora_solicitada)
        if not impresora_destino:
            return jsonify({
                "estado": "error",
                "mensaje": "No se encontró ninguna impresora matricial instalada en Windows."
            }), 404

        # 2. Generar el flujo binario ESC/P
        if "rawText" in payload and payload["rawText"]:
            raw_bytes = impresion_core.init_boleta() + impresion_core.encode_cp850(payload["rawText"]) + impresion_core.ESC_FORM_FEED
        else:
            raw_bytes = impresion_core.generar_bytes_documento(tipo, datos, es_copia=es_copia)

        # 3. Enviar RAW a la impresora
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


@app.route("/test", methods=["POST", "GET"])
def test_impresion():
    try:
        impresora_destino = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG)
        if not impresora_destino:
            return jsonify({"estado": "error", "mensaje": "Sin impresora disponible"}), 404

        raw_bytes = impresion_core.generar_bytes_documento("test", {})
        impresion_core.enviar_raw(impresora_destino, raw_bytes, titulo_doc="Test_Epson_FX890")
        return jsonify({
            "estado": "exito",
            "mensaje": f"Prueba enviada a {impresora_destino}"
        })
    except Exception as e:
        return jsonify({"estado": "error", "mensaje": str(e)}), 500


# ── System Tray (Bandeja del sistema) y GUI ────────────────────────────────────

def _crear_icono():
    img = Image.new("RGB", (64, 64), color=(30, 30, 30))
    d = ImageDraw.Draw(img)
    # Círculo azul marino
    d.ellipse([6, 6, 58, 58], fill=(13, 110, 253))
    # Silueta de impresora
    d.rectangle([18, 16, 46, 26], fill="white")  # papel superior
    d.rectangle([14, 26, 50, 42], fill="#f8f9fa")  # cuerpo impresora
    d.rectangle([20, 32, 44, 34], fill="#0d6efd")  # ranura
    d.rectangle([18, 42, 46, 52], fill="white")  # papel saliendo
    return img


def _actualizar_tooltip():
    if _tray_icon:
        activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG) or "Sin detectar"
        _tray_icon.title = f"Agente Impresión Matricial\nImpresora: {activa}\nPuerto: {PUERTO_HTTP}"


def _abrir_dialogo_impresora(icon=None, item=None):
    """Abre ventana Tkinter para seleccionar la impresora matricial."""
    global IMPRESORA_CONFIG

    def _ejecutar():
        root = tk.Tk()
        root.title("Configuración Impresora - Global Café")
        root.resizable(False, False)
        root.attributes("-topmost", True)

        root.update_idletasks()
        w, h = 380, 210
        x = (root.winfo_screenwidth() - w) // 2
        y = (root.winfo_screenheight() - h) // 2
        root.geometry(f"{w}x{h}+{x}+{y}")

        tk.Label(root, text="Seleccione la impresora matricial (FX-890II):", font=("Segoe UI", 9, "bold"), pady=10).pack()

        impresoras = impresion_core.listar_impresoras()
        if not impresoras:
            impresoras = ["No hay impresoras instaladas"]

        combo = ttk.Combobox(root, values=impresoras, width=35, font=("Segoe UI", 10))
        activa_actual = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG) or (impresoras[0] if impresoras else "")
        combo.set(activa_actual)
        combo.pack(pady=5)

        def _guardar():
            global IMPRESORA_CONFIG
            nueva = combo.get().strip()
            if not nueva or nueva == "No hay impresoras instaladas":
                return
            IMPRESORA_CONFIG = nueva
            _guardar_config({"impresora": IMPRESORA_CONFIG})
            _actualizar_tooltip()
            messagebox.showinfo("Guardado", f"Impresora configurada:\n{IMPRESORA_CONFIG}", parent=root)
            root.destroy()

        def _probar():
            sel = combo.get().strip()
            try:
                b = impresion_core.generar_bytes_documento("test", {})
                impresion_core.enviar_raw(sel, b, "Test_FX890")
                messagebox.showinfo("Éxito", f"Impresión de prueba enviada a:\n{sel}", parent=root)
            except Exception as ex:
                messagebox.showerror("Error", f"No se pudo imprimir:\n{ex}", parent=root)

        btn_frame = tk.Frame(root)
        btn_frame.pack(pady=15)

        tk.Button(btn_frame, text="Probar Impresión", command=_probar, bg="#6c757d", fg="white", padx=10, pady=5).pack(side=tk.LEFT, padx=5)
        tk.Button(btn_frame, text="Guardar", command=_guardar, bg="#0d6efd", fg="white", padx=15, pady=5).pack(side=tk.LEFT, padx=5)

        root.mainloop()

    threading.Thread(target=_ejecutar, daemon=True).start()


def _lanzar_test_rapido(icon=None, item=None):
    try:
        activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG)
        if not activa:
            return
        b = impresion_core.generar_bytes_documento("test", {})
        impresion_core.enviar_raw(activa, b, "Test_FX890")
    except Exception as e:
        print(f"Error en test: {e}")


def _salir(icon, item):
    icon.stop()
    sys.exit(0)


def _iniciar_tray():
    global _tray_icon
    activa = impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG) or "Detectando..."
    _tray_icon = pystray.Icon(
        "AgenteImpresion",
        _crear_icono(),
        f"Agente Impresión Matricial\nImpresora: {activa}\nPuerto: {PUERTO_HTTP}",
        menu=pystray.Menu(
            pystray.MenuItem("Agente Impresión (Epson FX-890II)", None, enabled=False),
            pystray.MenuItem(lambda item: f"Activa: {impresion_core.obtener_impresora_activa(IMPRESORA_CONFIG) or 'Ninguna'}", None, enabled=False),
            pystray.Menu.SEPARATOR,
            pystray.MenuItem("Cambiar / Configurar Impresora...", _abrir_dialogo_impresora),
            pystray.MenuItem("Imprimir página de prueba", _lanzar_test_rapido),
            pystray.Menu.SEPARATOR,
            pystray.MenuItem("Cerrar Agente", _salir),
        )
    )
    _tray_icon.run()


if __name__ == "__main__":
    print(f"Iniciando Agente de Impresión Matricial en http://127.0.0.1:{PUERTO_HTTP}...")
    flask_thread = threading.Thread(
        target=lambda: app.run(host="0.0.0.0", port=PUERTO_HTTP, debug=False, use_reloader=False),
        daemon=True
    )
    flask_thread.start()

    _iniciar_tray()
