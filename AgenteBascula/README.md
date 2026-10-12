# Agentes de Báscula e Impresión Matricial (Global Café)

Este módulo proporciona los agentes intermediarios locales en segundo plano para:
1. **Captura de báscula camionera/plataforma (Toledo TC420)** vía puerto serie (RS-232 / COM).
2. **Impresión ultra-rápida y nítida en impresoras matriciales (Epson FX-890II)** vía comandos nativos **ESC/P** y bypass de spooler en modo RAW.

---

## 🚀 ¿Por qué existen estos programas?

Los navegadores web modernos operan en una caja de arena (*sandbox*) por seguridad:
* **No pueden acceder libremente a puertos COM/RS-232** para capturar el peso sin diálogo manual.
* **No pueden imprimir en modo texto nativo (ESC/P) en impresoras matriciales:** Cuando el navegador usa `window.print()`, convierte el HTML en una imagen gráfica de mapa de bits. La impresora matricial de 9 pines intenta dibujar cada punto de la letra, tardando más de 30 segundos por boleta, gastando cinta, sacando letras borrosas y perdiendo la calibración del papel continuo.

Con estos agentes:
* La boleta se formatea en **texto ASCII puro a 80 columnas**, con negrita de impacto (`ESC E`), interlineado exacto y avance automático a la perforación (`Form Feed \x0C`).
* **Tiempo de impresión:** **1 a 2 segundos**.
* **Legibilidad:** 100% nítida con los tipos de letra internos de hardware de la Epson FX-890II.

---

## 📦 Componentes y Ejecutables

| Archivo | Destino | Funcionalidad |
| :--- | :--- | :--- |
| `agente_globalcafe.py` | **PC de Caseta de Báscula** | Báscula (Toledo) + Impresora (FX-890II) |
| `agente_impresion.py` | **PC de Recepción / Portería / Oficina** | Solo Impresora Matricial (FX-890II) |
| `impresion_core.py` | Módulo compartido | Motor ESC/P, detección de impresoras Windows y formateadores de boletas |

Ambos agentes escuchan en `http://127.0.0.1:4000`, por lo que el FrontEnd funciona de manera transparente en cualquier PC.

---

## 🛠️ Instrucciones para Compilar (.exe) con PyInstaller

### 1. Requisitos
Tener Python 3.10+ instalado en el equipo de desarrollo.
Instalar dependencias:
```bash
cd AgenteBascula
pip install -r requirements.txt
```

### 2. Generar el Ejecutable para la Caseta (Báscula + Impresora)
```bash
pyinstaller --onefile --noconsole agente_globalcafe.py
```
El ejecutable resultante estará en `dist/agente_globalcafe.exe`.

### 3. Generar el Ejecutable para Recepción / Oficina (Solo Impresora)
```bash
pyinstaller --onefile --noconsole agente_impresion.py
```
El ejecutable resultante estará en `dist/agente_impresion.exe`.

* `--onefile`: Empaqueta todo el entorno Python en un solo archivo `.exe`.
* `--noconsole`: Se ejecuta de forma invisible en la bandeja del sistema (*System Tray*).

---

## 🏭 Instalación en las Computadoras de Planta

1. Copia el `.exe` correspondiente a la PC (ej. `C:\GlobalCafe\agente_globalcafe.exe` o `agente_impresion.exe`).
2. Crea un acceso directo al `.exe`.
3. Presiona `Windows + R`, escribe `shell:startup` y presiona Enter (se abre la carpeta de inicio de Windows).
4. Pega el acceso directo en esa carpeta.
5. Cada vez que inicie Windows, el agente arrancará automáticamente con su ícono en la barra de tareas.

---

## ⚙️ Configuración y Opciones

Al hacer clic derecho sobre el ícono del agente en la barra de tareas (junto al reloj de Windows):
* **Cambiar puerto COM Báscula:** Permite seleccionar el puerto serie (ej. `COM1`, `COM3`, `COM5`) sin tocar código.
* **Cambiar Impresora Matricial:** Permite seleccionar la Epson FX-890II de la lista de impresoras de Windows.
* **Probar Impresión:** Envía una prueba inmediata de agujas e interlineado para verificar la comunicación.
