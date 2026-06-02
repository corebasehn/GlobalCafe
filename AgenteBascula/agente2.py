import serial
import time
import re
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PUERTO_COM = 'COM1'

def limpiar_datos_toledo(raw_data):
    try:
        texto = raw_data.decode('ascii', errors='ignore')
        numeros = re.findall(r'\d+\.\d+|\d+', texto)
        if numeros:
            return numeros[0]
    except Exception:
        pass
    return None

@app.route('/peso', methods=['GET'])
def obtener_peso():
    try:
        with serial.Serial(PUERTO_COM, baudrate=9600, bytesize=8, parity='N', stopbits=1, timeout=2) as puerto:
            puerto.reset_input_buffer()
            for _ in range(3):
                raw_data = puerto.readline()
                peso = limpiar_datos_toledo(raw_data)
                if peso:
                    return jsonify({"peso": peso, "estado": "exito"})
            return jsonify({"peso": "0.00", "estado": "error", "mensaje": "Datos ilegibles de la báscula"}), 500
    except serial.SerialException:
        return jsonify({"peso": "0.00", "estado": "error", "mensaje": "Báscula desconectada o puerto ocupado"}), 500
    except Exception as e:
        return jsonify({"peso": "0.00", "estado": "error", "mensaje": str(e)}), 500


@app.route('/raw', methods=['GET'])
def ver_raw():
    lecturas = []
    try:
        with serial.Serial(PUERTO_COM, baudrate=9600, bytesize=8, parity='N', stopbits=1, timeout=2) as puerto:
            puerto.reset_input_buffer()
            time.sleep(0.1)

            for i in range(5):
                raw_data = puerto.readline()

                if not raw_data:
                    lecturas.append({
                        "linea": i + 1,
                        "vacia": True,
                        "nota": "readline() devolvió vacío (timeout o sin datos)"
                    })
                    continue

                lecturas.append({
                    "linea"        : i + 1,
                    "longitud"     : len(raw_data),
                    "bytes_hex"    : " ".join(f"{b:02X}" for b in raw_data),
                    "bytes_dec"    : list(raw_data),
                    "texto_ascii"  : raw_data.decode('ascii', errors='replace'),
                    "texto_repr"   : repr(raw_data),
                    "peso_extraido": limpiar_datos_toledo(raw_data)
                })

        return jsonify({"puerto": PUERTO_COM, "lecturas": lecturas})

    except serial.SerialException as e:
        return jsonify({"error": "Puerto no disponible", "detalle": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/raw/stream', methods=['GET'])
def ver_raw_stream():
    try:
        with serial.Serial(PUERTO_COM, baudrate=9600, bytesize=8, parity='N', stopbits=1, timeout=0.1) as puerto:
            puerto.reset_input_buffer()

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


if __name__ == '__main__':
    print("=" * 45)
    print("  Agente de Báscula Toledo - v1.0")
    print("=" * 45)
    print(f"  Puerto     : {PUERTO_COM}")
    print(f"  URL base   : http://127.0.0.1:4000")
    print()
    print("  Endpoints disponibles:")
    print("  /peso        → peso limpio (producción)")
    print("  /raw         → 5 líneas hex/dec/ascii/repr")
    print("  /raw/stream  → captura continua 5 segundos")
    print("=" * 45)
    app.run(host='127.0.0.1', port=4000, debug=False)