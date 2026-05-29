# Global Café - FrontEnd Client

Este es el cliente web del sistema Global Café, desarrollado con [React](https://reactjs.org/) y [Vite](https://vitejs.dev/). Proporciona una interfaz moderna, reactiva y eficiente para la gestión de beneficios de café.

---

## 🛠️ Tecnologías Principales

*   **Framework:** React (v18)
*   **Build Tool:** Vite
*   **Lenguaje:** TypeScript
*   **Estilos:**
    *   **Tailwind CSS (v4):** Para diseño rápido y utilitario.
    *   **Sass:** Para estilos estructurados y variables complejas.
    *   **Bootstrap / React Bootstrap:** Para componentes estructurales.
    *   **Material UI (MUI):** Para componentes de interfaz avanzada.
*   **Gestión de Estado:** Redux Toolkit
*   **Enrutamiento:** React Router DOM (v6)
*   **Visualización de Datos:** ApexCharts, Chart.js, ECharts
*   **Mapas:** Leaflet
*   **Comunicación API:** Axios + Socket.io-client

---

## 🔐 Seguridad y Acceso (RBAC)

El frontend implementa un control de acceso basado en roles (RBAC) altamente granular:

*   **`AuthProvider`:** Gestiona el estado global de autenticación y persistencia de sesión.
*   **`ProtectedRoute`:** Componente de alto orden para restringir el acceso a rutas según el estado de login.
*   **`RequirePermission`:** Componente que oculta o muestra elementos de la interfaz (botones, secciones) basándose en los permisos específicos del usuario (ej. `RECEPTION_CREATE`, `QUALITY_ADMIN`).
*   **`useAuth`:** Hook personalizado para acceder fácilmente a la información del usuario y sus capacidades.

---

## 📁 Estructura de Directorios

El proyecto sigue una organización modular por responsabilidades:

*   **`src/api/`:** Definiciones de servicios y configuración de Axios para interactuar con el BackEnd.
*   **`src/auth/`:** Proveedores de contexto de autenticación, guardias de ruta y lógica de permisos (RBAC).
*   **`src/components/`:** Componentes reutilizables organizados por categorías (layout, forms, elements, muetreo, remision).
*   **`src/pages/`:** Vistas principales organizadas por los módulos operativos del negocio (recepcion, industrial, comercial, admin).
*   **`src/assets/`:** Recursos estáticos como imágenes, fuentes y archivos SCSS/CSS.
*   **`src/common/`:** Utilidades, constantes y configuración compartida de Redux.

---

## 🚀 Configuración y Desarrollo

### 1. Instalación
```bash
$ npm install
```

### 2. Variables de Entorno
Crea un archivo `.env` en la raíz de la carpeta `FrontEnd/`:
```env
VITE_API_URL="http://localhost:3000/api"
```

### 3. Compilación de Estilos (Sass)
El proyecto requiere compilar los archivos Sass iniciales:
```bash
$ npm run sass
```

### 4. Ejecución
```bash
# Modo desarrollo
$ npm run dev

# Construcción para producción
$ npm run build

# Previsualización de la versión de producción
$ npm run preview
```

---

## ⚖️ Integración con Báscula

El sistema incluye lógica para capturar pesos automáticamente. El frontend realiza peticiones locales al agente de pesaje:

*   **Endpoint del Agente:** `http://127.0.0.1:4000/peso`
*   **Interfaz:** El componente `PesadaModal` incluye un botón con icono ⚡ que activa la captura.
*   **Feedback:** Muestra indicadores de carga (spinners) y manejo de errores si el agente no está disponible o el puerto COM está ocupado.
*   **Protocolo:** El frontend solicita el peso al agente local mediante `fetch` al momento de presionar "Capturar de Báscula".

---

## 🎨 Convenciones de Estilo

*   **Naming:** Se prefiere PascalCase para componentes y camelCase para funciones y variables.
*   **Diseño:** Se utiliza una combinación de Tailwind para layouts rápidos y Sass para personalizaciones profundas del tema.
*   **Responsividad:** El sistema está optimizado para su uso en computadoras de escritorio y tablets en estaciones de trabajo industriales.

---

## 🛡️ Licencia

Global Café es una aplicación de software **privada y propietaria**. Consulta el archivo `Legal Agreement & Copyright Notice.txt` para más detalles legales.
