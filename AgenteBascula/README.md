# Agente de Báscula (Global Café)

Este es el programa intermediario que permite conectar el sistema web en la nube con las básculas físicas locales (Ej. Toledo TC420).

## 🚀 ¿Por qué existe este programa?

Por seguridad, un navegador web (Chrome, Edge) no puede leer directamente los puertos físicos (COM/USB) de la computadora. Este Agente soluciona ese problema:

1. Se ejecuta silenciosamente en la computadora donde está conectada la báscula.
2. Crea un mini-servidor local en `http://127.0.0.1:4000/peso`.
3. Cuando el usuario hace clic en "Capturar Peso" en el sistema web, el navegador hace una petición a este Agente.
4. El Agente abre el puerto `COM3` (o el que se configure), lee el peso exacto de la báscula, cierra el puerto y le devuelve el dato limpio al navegador web.

## 🛠️ Instrucciones para Compilar (.exe)

Para que el operario no tenga que instalar Python ni ver consolas negras, empaquetaremos este script en un archivo ejecutable `.exe` invisible.

**Requisitos previos:**
Debes tener Python instalado en tu computadora de desarrollo.

**Pasos:**

1.  Abre una terminal y navega a esta carpeta (`GlobalCafe/AgenteBascula`).
2.  Instala las dependencias necesarias:
    ```bash
    pip install -r requirements.txt
    ```
3.  Ejecuta el empaquetador mágico (PyInstaller):
    ```bash
    pyinstaller --onefile --noconsole agente_bascula.py
    ```
    *   `--onefile`: Mete todo en un solo `.exe`.
    *   `--noconsole`: Lo hace **invisible** (se ejecuta en segundo plano sin mostrar ventana negra).

4.  Ve a la carpeta `dist/` que se acaba de crear. Ahí encontrarás `agente_bascula.exe`. Este es el **ÚNICO** archivo que necesitas llevar a la computadora de la caseta.

## 🏭 Instalación en la Caseta (Arranque Automático)

Una vez que tengas el `agente_bascula.exe` en una USB, llévalo a la computadora que está conectada a la báscula.

1.  Pega el `.exe` en una carpeta segura (ej. `C:\GlobalCafe\agente_bascula.exe`).
2.  Haz clic derecho sobre el `.exe` y selecciona **Crear acceso directo**.
3.  Presiona en el teclado `Windows + R`, escribe `shell:startup` y dale a Enter. Se abrirá la carpeta oculta de inicio de Windows.
4.  Pega el acceso directo ahí dentro.

¡Listo! Cada vez que enciendan la PC, el Agente arrancará en segundo plano y estará listo para darle el peso al sistema web.

## ⚠️ NOTA IMPORTANTE (Puerto COM)

El script viene configurado por defecto para escuchar en el puerto `COM3`.

Si al conectar el cable USB/Serial a la PC de la caseta, el administrador de dispositivos le asigna otro puerto (ej. `COM5`), debes:
1. Abrir `agente_bascula.py`.
2. Cambiar la línea `PUERTO_COM = 'COM3'` a `PUERTO_COM = 'COM5'`.
3. Volver a compilar el `.exe` con el comando del paso 3.
