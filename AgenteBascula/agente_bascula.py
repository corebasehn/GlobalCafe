import serial
import time
import re
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

PUERTO_COM = 'COM1' # <-- Asegúrate de que este sea el puerto correcto en la PC de la caseta

def limpiar_datos_toledo(raw_data):
    try:
        texto = raw_data.decode('ascii', errors='ignore')
        numeros = re.findall(r'\d+\.\d+|\d+', texto)
        if numeros:
            return numeros[0]
    except Exception:
        pass
    return None

# Endpoint que abre y cierra bajo demanda
@app.route('/peso', methods=['GET'])
def obtener_peso():
    try:
        # 1. ABRIMOS EL PUERTO (El "with" garantiza que se cierre automáticamente al terminar)
        # timeout=2 evita que se quede colgado si la báscula está apagada
        with serial.Serial(PUERTO_COM, baudrate=9600, bytesize=8, parity='N', stopbits=1, timeout=2) as puerto:
            
            # 2. LIMPIAR BASURA VIEJA: Borramos lo que haya quedado atascado en el cable
            puerto.reset_input_buffer()
            
            # 3. LEER: Intentamos leer hasta 3 líneas seguidas para asegurar un dato fresco
            for _ in range(3):
                raw_data = puerto.readline()
                peso = limpiar_datos_toledo(raw_data)
                
                if peso:
                    # 4. CIERRE Y RESPUESTA EXITOSA (El puerto se cierra solo al salir del "with")
                    return jsonify({"peso": peso, "estado": "exito"})
                    
            # Si leyó 3 veces y era pura basura:
            return jsonify({"peso": "0.00", "estado": "error", "mensaje": "Datos ilegibles de la báscula"}), 500

    except serial.SerialException as e:
        # El puerto se cerró solo por el error. No hay procesos colgados.
        return jsonify({"peso": "0.00", "estado": "error", "mensaje": "Báscula desconectada o puerto ocupado"}), 500
    except Exception as e:
        return jsonify({"peso": "0.00", "estado": "error", "mensaje": str(e)}), 500

if __name__ == '__main__':
    print("Agente de Báscula (Modo Bajo Demanda) Iniciado...")
    # Corre el servidor sin hilos extras
    app.run(host='127.0.0.1', port=4000, debug=False)
