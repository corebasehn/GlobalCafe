# Global Café - Sistema de Gestión de Recepciones y Control de Café

Este proyecto es una aplicación integral para la gestión de recepciones, análisis de calidad y control operativo de café. Está dividido en dos partes principales: un **BackEnd** construido con NestJS y Prisma, y un **FrontEnd** desarrollado con React, Vite y Tailwind CSS.

---

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

*   **Node.js** (v18.0.0 o superior)
*   **npm** (incluido con Node.js)
*   **PostgreSQL** (v14 o superior)
*   **Git**

---

## 🛠️ Instalación y Configuración

Sigue estos pasos detallados para poner en marcha el proyecto en tu entorno local.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/GlobalCafe.git
cd GlobalCafe
```

### 2. Configuración del BackEnd

El servidor gestiona la lógica de negocio y la conexión con la base de datos (PostgreSQL/Neon).

1.  **Entrar a la carpeta del BackEnd:**
    ```bash
    cd BackEnd
    ```

2.  **Instalar dependencias:**
    Se recomienda usar `npm install`. El proyecto incluye un archivo `package-lock.json` que asegura que todos los desarrolladores instalen exactamente las mismas versiones de las librerías.
    ```bash
    npm install
    ```

3.  **Configurar Variables de Envorno:**
    Crea un archivo llamado `.env` en la raíz de la carpeta `BackEnd/` y añade tu cadena de conexión (DATABASE_URL).
    ```env
    DATABASE_URL="postgresql://USUARIO:CONTRASEÑA@tu-servidor-neon.tech/global_cafe_db?sslmode=require"
    ```

4.  **Generar el Cliente de Prisma:**
    Es necesario generar el cliente para que el código reconozca los modelos de la base de datos:
    ```bash
    npx prisma generate
    ```

5.  **Iniciar el Servidor en modo desarrollo:**
    ```bash
    npm run start:dev
    ```
    *   **API URL:** `http://localhost:3000/api`
    *   **Documentación (Swagger):** `http://localhost:3000/api/docs`

---

### 3. Configuración del FrontEnd

El cliente web interactúa con el API de NestJS.

1.  **Entrar a la carpeta del FrontEnd:**
    Abre una nueva terminal y navega a la carpeta correspondiente:
    ```bash
    cd FrontEnd
    ```

2.  **Instalar dependencias:**
    Se recomienda usar `npm install`. El proyecto incluye un archivo `package-lock.json` que asegura que todos los desarrolladores instalen exactamente las mismas versiones de las librerías.
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo llamado `.env` en la raíz de la carpeta `FrontEnd/`:
    ```env
    VITE_API_URL="http://localhost:3000/api"
    ```

4.  **Compilar y ejecutar estilos (Sass):**
    El proyecto utiliza Sass para algunos estilos personalizados:
    ```bash
    npm run sass
    ```

5.  **Iniciar la Aplicación:**
    ```bash
    npm run dev
    ```
    *   **URL Local:** `http://localhost:5173`

---

## 📁 Estructura del Proyecto

*   `BackEnd/`: Servidor NestJS.
    *   `src/`: Código fuente del API.
    *   `prisma/`: Esquema de base de datos y scripts de seed.
*   `FrontEnd/`: Cliente React.
    *   `src/api/`: Servicios de conexión con el API.
    *   `src/pages/`: Vistas de la aplicación organizadas por módulo.
    *   `src/components/`: Componentes reutilizables.

---

## 🔑 Acceso al Sistema

Para ingresar al sistema, utiliza las credenciales de usuario proporcionadas por el administrador o las que ya estén configuradas en la base de datos de Neon. 

Si necesitas crear un usuario inicial en una base de datos nueva, puedes revisar el archivo `BackEnd/prisma/seed.ts` para ver el formato de los datos.

---

## 🛡️ Licencia

Este proyecto está bajo una licencia privada. Consulta el archivo `Legal Agreement & Copyright Notice.txt` en la carpeta FrontEnd para más detalles.
