# Global Café - Sistema de Gestión de Recepciones y Control de Café

Global Café es una solución integral diseñada para la gestión operativa y administrativa de beneficios y exportadoras de café. El sistema permite el control total desde la recepción del grano, análisis de calidad (catación), gestión de patios, pesaje automatizado y control de despacho.

---

## 🌟 Características Principales

*   **📦 Gestión de Recepciones:** Registro detallado de entradas de café por sucursal, cosecha y tipo de vehículo.
*   **🔬 Análisis de Calidad:** Módulo completo de catación que incluye rendimiento, humedad, defectos, zarandas y análisis de taza.
*   **🏗️ Control de Patios y Bodegas:** Seguimiento de estibas y ubicación física del producto (Notas de Patio).
*   **⚖️ Control de Pesaje (Notas de Peso):** Registro preciso de pesos brutos, tara y cálculos automáticos de peso neto con descuentos por humedad y calidad.
*   **🔌 Integración con Básculas Industriales:** Soporte para captura automática de peso desde indicadores (ej. Toledo TC420) mediante un agente local.
*   **🔐 Seguridad y RBAC:** Sistema robusto de Roles y Permisos (RBAC) con optimización para dispositivos móviles (evitando errores de auto-capitalización).
*   **📡 Conectividad en Red:** Configuración de CORS preparada para demostraciones en red local (IP 192.168.x.x).
*   **📢 Notificaciones en Tiempo Real:** Actualizaciones instantáneas mediante WebSockets (Socket.io).
*   **📊 Configuración Visual:** Personalización de colores y logotipos por empresa.

---

## 🛠️ Tecnologías y Arquitectura

El sistema sigue una arquitectura de cliente-servidor con un componente periférico para hardware industrial:

*   **BackEnd (API REST):** Construido con **NestJS**, utiliza **Prisma ORM** como motor de persistencia sobre **PostgreSQL**. Esta capa garantiza la integridad referencial y proporciona un tipado fuerte para toda la lógica de negocio.
*   **FrontEnd (SPA):** Una aplicación moderna en **React** (Vite + TypeScript) que implementa un sistema de diseño híbrido (Tailwind + Bootstrap/MUI) para máxima flexibilidad operativa.
*   **Agente de Báscula:** Un servicio especializado en **Python** que resuelve el puente entre el navegador y el hardware serie (RS-232), permitiendo la captura de peso en tiempo real sin intervención manual.

---

## 📁 Estructura del Proyecto

```text
GlobalCafe/
├── BackEnd/              # API NestJS (Lógica, Seguridad, DB)
│   ├── prisma/           # Modelado de datos (schema.prisma) y seeds
│   └── src/              # Módulos operativos (reception, analisis, etc.)
├── FrontEnd/             # Cliente React (Interfaz, Dashboards)
│   ├── src/api/          # Integración con el API y WebSockets
│   ├── src/auth/         # Gestión de RBAC y Sesiones
│   └── src/pages/        # Vistas por rol de usuario
└── AgenteBascula/        # Puente de hardware (Python)
    └── agente_bascula.py # Lector de puerto serial
```

---

## 🚀 Instalación y Configuración

### 1. Requisitos Previos
*   Node.js v18+
*   PostgreSQL v14+
*   npm

### 2. Configuración del BackEnd
1.  `cd BackEnd`
2.  `npm install`
3.  Configura el `.env` con tu `DATABASE_URL`.
4.  `npx prisma generate`
5.  `npx prisma migrate dev` (para base de datos nueva) o `npx prisma db pull` (si ya existe).
6.  `npm run start:dev`

*   **API URL:** `http://localhost:3000/api`
*   **Swagger Docs:** `http://localhost:3000/api/docs`

### 3. Configuración del FrontEnd
1.  `cd FrontEnd`
2.  `npm install`
3.  Configura el `.env` con `VITE_API_URL="http://localhost:3000/api"`.
4.  `npm run sass` (para compilar estilos iniciales).
5.  `npm run dev`

---

## ⚖️ Integración con Básculas (Agente de Pesaje)

Para la captura automática de peso, el sistema utiliza un **Agente Local** (Python/Node.js) que se comunica con el indicador de la báscula vía RS-232 y expone un endpoint local (`http://127.0.0.1:4000/peso`).

*   **Opción Recomendada:** Ejecutable (.exe) invisible que arranca con Windows.
*   **Protocolo:** El frontend solicita el peso al agente local mediante `fetch` al momento de presionar "Capturar Peso".

---

## 🔑 Acceso al Sistema

El sistema utiliza credenciales gestionadas en el módulo de Seguridad. Para una instalación nueva, revisa `BackEnd/prisma/seed.ts` para las credenciales por defecto o utiliza el script `check-users.ts` para verificar usuarios existentes.

---

## 🛡️ Licencia y Copyright

Este proyecto es de carácter **privado**. Consulta `FrontEnd/Legal Agreement & Copyright Notice.txt` para términos de uso y derechos de autor.

