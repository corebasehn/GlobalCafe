<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Global Café - BackEnd API

Este es el servidor central del sistema Global Café, construido con [NestJS](https://github.com/nestjs/nest). Gestiona la lógica de negocio, la persistencia de datos y la comunicación en tiempo real para la gestión operativa de beneficios de café.

---

## 🛠️ Tecnologías

*   **Framework:** NestJS (v11)
*   **ORM:** Prisma (v5)
*   **Base de Datos:** PostgreSQL
*   **Autenticación:** Passport.js + JWT (con normalización de minúsculas para login móvil)
*   **Documentación:** Swagger / OpenAPI
*   **Comunicación:** Socket.io (WebSockets)
*   **Red:** Configurado para escuchar en `0.0.0.0` para acceso desde red local.
*   **Validación:** Class-validator & Class-transformer

---

## 🗄️ Gestión de Base de Datos (Prisma)

El proyecto utiliza **Prisma ORM** para una gestión de datos robusta y segura:

1.  **Modelado:** Definido en `prisma/schema.prisma`, cubriendo módulos Administrativos, RBAC y Operativos.
2.  **Type Safety:** Generación automática de tipos para TypeScript, minimizando errores en tiempo de ejecución.
3.  **PrismaService:** Centralizado en `src/prisma.service.ts` para inyectar el cliente en todos los módulos de NestJS.
4.  **Migraciones:** Control de versiones de la estructura de la base de datos mediante `npx prisma migrate`.
5.  **Seeds:** Datos maestros (Departamentos, Municipios, Roles base) gestionados vía `prisma/seed.ts`.

---

## 📁 Módulos Principales

El backend está organizado de forma modular para facilitar su escalabilidad:

*   **Auth:** Gestión de sesiones, login (JWT) y perfiles de usuario.
*   **Users:** Administración de usuarios del sistema.
*   **Roles:** Sistema RBAC (Role-Based Access Control) con gestión de permisos granulares.
*   **Catalogs:** Mantenimiento de tablas base (Departamentos, Municipios, Proveedores, Cosechas, etc.).
*   **Reception:** Control de entradas de café y recepción física.
*   **Analisis:** Módulo técnico para catación y análisis físico/sensorial del grano.
*   **Notifications:** Gateway de WebSockets para alertas y actualizaciones en tiempo real.
*   **Commercial / Sales / Industrial:** Estructuras preparadas para la expansión operativa.

---

## 🚀 Configuración del Proyecto

### 1. Instalación
```bash
$ npm install
```

### 2. Base de Datos
Crea un archivo `.env` en esta carpeta con la siguiente variable:
```env
DATABASE_URL="postgresql://USUARIO:PASSWORD@HOST:PUERTO/DB_NAME?sslmode=require"
```

Genera el cliente de Prisma y aplica las migraciones:
```bash
$ npx prisma generate
$ npx prisma migrate dev
```

### 3. Población de Datos (Seed)
Para cargar los catálogos base y el usuario administrador inicial:
```bash
$ npx prisma db seed
```

---

## 🛠️ Ejecución

```bash
# Desarrollo
$ npm run start:dev

# Producción
$ npm run build
$ npm run start:prod
```

---

## 📖 Documentación de la API

Una vez que el servidor esté corriendo, puedes acceder a la documentación interactiva (Swagger) en:

🔗 `http://localhost:3000/api/docs`

---

## 🧪 Pruebas

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e
```

---

## 🛡️ Licencia

Global Café es una aplicación de software **privada y propietaria**. Todos los derechos reservados.
