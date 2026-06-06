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
from flask import Flask, jsonify
from flask_cors import CORS
import pystray
from PIL import Image, ImageDraw
import tkinter as tk
from tkinter import ttk, messagebox

app = Flask(__name__)
CORS(app)

# ── Config persistente ────────────────────────────────────────────────────────
CONFIG_PATH = os.path.join(os.path.dirname(sys.executable if getattr(sys, 'frozen', False) else __file__), 'config.json')

def _cargar_config():
    try:
        with open(CONFIG_PATH, 'r') as f:
            return json.load(f)
    except Exception:
        return {}

def _guardar_config(data):
    try:
        with open(CONFIG_PATH, 'w') as f:
            json.dump(data, f)
    except Exception:
        pass

cfg = _cargar_config()
PUERTO_COM = cfg.get('puerto_com', 'COM3')

# ── Log de pesadas ────────────────────────────────────────────────────────────
LOG_DIR = r'C:\LogPesada'
os.makedirs(LOG_DIR, exist_ok=True)

def _registrar_pesada(peso: str, estado: str):
    ahora = datetime.now()
    nombre_archivo = os.path.join(LOG_DIR, ahora.strftime('%Y-%m-%d') + '.txt')
    linea = f"{ahora.strftime('%Y-%m-%d %H:%M:%S')} | Puerto: {PUERTO_COM} | Peso: {peso} | Estado: {estado}\n"
    try:
        with open(nombre_archivo, 'a', encoding='utf-8') as f:
            f.write(linea)
    except Exception:
        pass

# ── Puerto serial ─────────────────────────────────────────────────────────────
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
        p = serial.Serial(PUERTO_COM, baudrate=9600, bytesize=8, parity='N',
                          stopbits=1, timeout=timeout_serial)
        p.reset_input_buffer()
        p.read_until(b'\r')  # descarta paquete incompleto para sincronizar
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


# ── Parser Toledo ─────────────────────────────────────────────────────────────
def limpiar_datos_toledo(raw_data):
    # Formato Toledo: STX + estado(1 byte) + 2 espacios + 12 dígitos + CR
    try:
        texto = raw_data.decode('ascii', errors='ignore')
        match = re.search(r'\x02(.)\s{2}(\d{6})', texto)
        if match:
            estable = match.group(1) == '1'
            peso = int(match.group(2))
            if peso > 0:
                return str(peso), estable
        for n in re.findall(r'\d+\.\d+|\d+', texto):
            if len(n) > 2:
                return n, True
    except Exception:
        pass
    return None, False


# ── Endpoints Flask ───────────────────────────────────────────────────────────
@app.route('/peso', methods=['GET'])
def obtener_peso():
    try:
        puerto = _abrir_puerto(timeout_serial=2)
        ultimo_peso = None
        for _ in range(5):
            raw_data = puerto.read_until(b'\r')
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


@app.route('/raw', methods=['GET'])
def ver_raw():
    lecturas = []
    try:
        puerto = _abrir_puerto(timeout_serial=2)
        time.sleep(0.1)
        for i in range(5):
            raw_data = puerto.read_until(b'\r')
            if not raw_data:
                lecturas.append({"linea": i + 1, "vacia": True})
                continue
            lecturas.append({
                "linea"        : i + 1,
                "longitud"     : len(raw_data),
                "bytes_hex"    : " ".join(f"{b:02X}" for b in raw_data),
                "bytes_dec"    : list(raw_data),
                "texto_ascii"  : raw_data.decode('ascii', errors='replace'),
                "texto_repr"   : repr(raw_data),
                "peso_extraido": limpiar_datos_toledo(raw_data)[0]
            })
        return jsonify({"puerto": PUERTO_COM, "lecturas": lecturas})
    except serial.SerialException as e:
        return jsonify({"error": "Puerto no disponible", "detalle": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        _cerrar_puerto()


@app.route('/raw/stream', methods=['GET'])
def ver_raw_stream():
    try:
        puerto = _abrir_puerto(timeout_serial=0.1)
        todos_los_bytes = bytearray()
        inicio = time.time()
        while time.time() - inicio < 5:
            chunk = puerto.read(puerto.in_waiting or 1)
            if chunk:
                todos_los_bytes.extend(chunk)
        return jsonify({
            "puerto"      : PUERTO_COM,
            "duracion_seg": 5,
            "total_bytes" : len(todos_los_bytes),
            "hex_completo": todos_los_bytes.hex(' '),
            "texto_ascii" : todos_los_bytes.decode('ascii', errors='replace'),
            "texto_repr"  : repr(bytes(todos_los_bytes)),
            "bytes_dec"   : list(todos_los_bytes)
        })
    except serial.SerialException as e:
        return jsonify({"error": "Puerto no disponible", "detalle": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        _cerrar_puerto()


# ── System Tray ───────────────────────────────────────────────────────────────
_tray_icon: Optional[pystray.Icon] = None

def _crear_icono_imagen():
    img = Image.new('RGB', (64, 64), color=(30, 30, 30))
    d = ImageDraw.Draw(img)
    d.ellipse([8, 8, 56, 56], fill=(0, 180, 80))
    d.rectangle([28, 20, 36, 44], fill='white')
    d.rectangle([22, 38, 42, 44], fill='white')
    return img


def _actualizar_tooltip():
    if _tray_icon:
        _tray_icon.title = f"Agente Báscula Toledo\nPuerto: {PUERTO_COM} — :4000"


def _abrir_dialogo_puerto(icon, item):
    """Abre ventana Tkinter para cambiar el puerto COM."""
    global PUERTO_COM

    def _ejecutar():
        root = tk.Tk()
        root.title("Cambiar Puerto COM")
        root.resizable(False, False)
        root.attributes('-topmost', True)

        # Centrar ventana
        root.update_idletasks()
        w, h = 320, 160
        x = (root.winfo_screenwidth() - w) // 2
        y = (root.winfo_screenheight() - h) // 2
        root.geometry(f"{w}x{h}+{x}+{y}")

        tk.Label(root, text="Seleccione o escriba el puerto COM:", pady=10).pack()

        # Detectar puertos disponibles
        puertos_disponibles = [p.device for p in serial.tools.list_ports.comports()]
        if PUERTO_COM not in puertos_disponibles:
            puertos_disponibles.insert(0, PUERTO_COM)

        combo = ttk.Combobox(root, values=puertos_disponibles, width=20, font=('Arial', 12))
        combo.set(PUERTO_COM)
        combo.pack(pady=5)

        def _guardar():
            global PUERTO_COM
            nuevo = combo.get().strip().upper()
            if not nuevo:
                return
            PUERTO_COM = nuevo
            _guardar_config({'puerto_com': PUERTO_COM})
            _actualizar_tooltip()
            messagebox.showinfo("Guardado", f"Puerto cambiado a {PUERTO_COM}\nLos cambios aplican en la siguiente petición.", parent=root)
            root.destroy()

        tk.Button(root, text="Guardar", command=_guardar, bg='#0d6efd', fg='white',
                  padx=20, pady=5).pack(pady=10)
        root.mainloop()

    threading.Thread(target=_ejecutar, daemon=True).start()


def _salir(icon, item):
    icon.stop()
    sys.exit(0)


def _iniciar_tray():
    global _tray_icon
    _tray_icon = pystray.Icon(
        "Agente Bascula",
        _crear_icono_imagen(),
        f"Agente Báscula Toledo\nPuerto: {PUERTO_COM} — :4000",
        menu=pystray.Menu(
            pystray.MenuItem("Agente Báscula Toledo", None, enabled=False),
            pystray.MenuItem(lambda item: f"Puerto activo: {PUERTO_COM}", None, enabled=False),
            pystray.Menu.SEPARATOR,
            pystray.MenuItem("Cambiar puerto COM...", _abrir_dialogo_puerto),
            pystray.Menu.SEPARATOR,
            pystray.MenuItem("Cerrar agente", _salir),
        )
    )
    _tray_icon.run()


if __name__ == '__main__':
    flask_thread = threading.Thread(
        target=lambda: app.run(host='0.0.0.0', port=4000, debug=False, use_reloader=False),
        daemon=True
    )
    flask_thread.start()

    _iniciar_tray()
