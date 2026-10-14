# MANUAL DE USUARIO — SISTEMA GLOBAL CAFÉ
## Sistema de Gestión Operativa, Control de Calidad, Beneficio y Despacho de Café

---

| FICHA TÉCNICA DEL DOCUMENTO | |
| :--- | :--- |
| **Nombre del Sistema:** | Global Café (ERP Cafetalero) |
| **Versión del Sistema:** | v1.0.0 — Enterprise |
| **Fecha de Emisión:** | Septiembre 2026 |
| **Elaborado para:** | Personal Operativo, Técnico, Administrativo y Gerencial |
| **Áreas Cubiertas:** | Portería/Recepción, Laboratorio/Catación, Báscula Industrial, WMS Patio/Bodegas, Comercial, Beneficio Seco (Industrial), Despacho/Exportación, Ventas Locales y Administración |
| **Estado:** | Versión Oficial de Entrega |

---

## TABLA DE CONTENIDO

1. [INTRODUCCIÓN Y PROPÓSITO DEL SISTEMA](#1-introducción-y-propósito-del-sistema)
2. [REQUISITOS DEL SISTEMA Y ARQUITECTURA GENERAL](#2-requisitos-del-sistema-y-arquitectura-general)
3. [ACCESO AL SISTEMA Y NAVEGACIÓN GENERAL](#3-acceso-al-sistema-y-navegación-general)
   - 3.1. Inicio de Sesión (Login)
   - 3.2. Estructura de la Interfaz (Header, Sidebar y Notificaciones)
   - 3.3. Control de Acceso Basado en Roles (RBAC)
4. [DASHBOARD OPERACIONAL](#4-dashboard-operacional)
5. [MÓDULO 1: RECEPCIÓN DE CAFÉ (FLUJO OPERATIVO COMPLETO)](#5-módulo-1-recepción-de-café-flujo-operativo-completo)
   - 5.1. Registro de Remisión (Portería)
   - 5.2. Muestreo en Patio
   - 5.3. Laboratorio de Calidad y Catación (Muestra Previa y General)
   - 5.4. Báscula de Entrada (Pesaje Bruto y Cambio de Cabezal)
   - 5.5. Omitir Análisis (Excepción Operativa)
   - 5.6. WMS Patio y Almacenamiento (Descarga, Estibas y Faltos)
   - 5.7. Nota de Peso y Liquidación (Pesaje Tara, Descuentos y Neto)
   - 5.8. Aprobación de Gerencia (Calidad y Faltos)
   - 5.9. Diagrama de Estados de la Recepción
6. [MÓDULO 2: GESTIÓN COMERCIAL](#6-módulo-2-gestión-comercial)
   - 6.1. Contratos de Venta
   - 6.2. Laboratorio Pre-Embarque
   - 6.3. Aprobación de Muestra por el Cliente
   - 6.4. Generación de Lotes
   - 6.5. Instrucciones de Embarque (Shipping Instructions - SI)
   - 6.6. Inventario Pergamino
7. [MÓDULO 3: GESTIÓN INDUSTRIAL (BENEFICIO SECO)](#7-módulo-3-gestión-industrial-beneficio-seco)
   - 7.1. Programa de Producción
   - 7.2. Orden de Sacos y Empaque
   - 7.3. Control del Proceso de Trilla
   - 7.4. Balance de Masas
   - 7.5. Producto Terminado
   - 7.6. Merma y Remanentes
8. [MÓDULO 4: DESPACHO Y EXPORTACIÓN](#8-módulo-4-despacho-y-exportación)
   - 8.1. Carga de Contenedor y Marchamos
   - 8.2. Báscula de Salida (Peso Bruto y VGM)
   - 8.3. Documentación Final de Embarque
9. [MÓDULO 5: VENTAS LOCALES Y SUBPRODUCTOS](#9-módulo-5-ventas-locales-y-subproductos)
   - 9.1. Kardex de Subproductos
   - 9.2. Orden de Venta Local
   - 9.3. Báscula de Venta Local
   - 9.4. Salida y Entrega Local
10. [MÓDULO 6: ADMINISTRACIÓN Y CONFIGURACIÓN](#10-módulo-6-administración-y-configuración)
    - 10.1. Gestión de Usuarios
    - 10.2. Roles y Matriz de Permisos
    - 10.3. Mantenimiento de Catálogos Maestros (18 Catálogos)
    - 10.4. Configuración Visual y Parámetros de la Empresa
11. [GUÍA DE OPERACIÓN DEL AGENTE DE BÁSCULA INDUSTRIAL](#11-guía-de-operación-del-agente-de-báscula-industrial)
    - 11.1. Funcionamiento del Agente Toledo TC420
    - 11.2. Cómo capturar el peso en pantalla
    - 11.3. Diagnóstico de fallas en báscula
12. [PREGUNTAS FRECUENTES (FAQ) Y RESOLUCIÓN DE PROBLEMAS](#12-preguntas-frecuentes-faq-y-resolución-de-problemas)
13. [GLOSARIO DE TÉRMINOS OPERATIVOS](#13-glosario-de-términos-operativos)

---

## 1. INTRODUCCIÓN Y PROPÓSITO DEL SISTEMA

**Global Café** es una plataforma tecnológica integral desarrollada específicamente para optimizar, controlar y transparentar todas las operaciones de beneficios de café, cooperativas cafetaleras y empresas exportadoras.

El sistema garantiza una **trazabilidad física y digital de 360 grados**:
- Desde el instante en que un camión o contenedor arriba a portería con café en grano (pergamino seco, húmedo o uva).
- Pasando por los rigurosos análisis físicos y sensoriales de laboratorio (catación según estándares internacionales SCAA / IHCAFE).
- El pesaje automatizado sin manipulación manual mediante básculas de plataforma industriales.
- El almacenamiento y estibado inteligente en patios y bodegas (WMS).
- La transformación industrial en planta de beneficio seco (trillado, clasificación, balance de masas y empaque).
- Hasta la consolidación en contenedores de exportación, despacho marítimo y venta de subproductos locales.

---

## 2. REQUISITOS DEL SISTEMA Y ARQUITECTURA GENERAL

### 2.1. Requisitos de Estación de Trabajo (Usuario Final)
- **Navegador Web Compatible:** Google Chrome (versión 110+), Microsoft Edge (versión 110+) o Mozilla Firefox. *Recomendado Google Chrome.*
- **Resolución de Pantalla:** Mínimo 1366 x 768 píxeles. Recomendado Full HD (1920 x 1080) para visualización cómoda de tablas operativas.
- **Conectividad:** Conexión a la red local (LAN/Wi-Fi) del beneficio o acceso a Internet de al menos 5 Mbps estables.
- **Impresoras:** Impresora láser o de inyección de tinta configurada para boletas en papel carta estándar, o impresora térmica para pases de salida rápidos.

### 2.2. Requisitos Específicos para la Caseta de Báscula
- Computadora con sistema operativo **Windows 10 o Windows 11**.
- Cable de conexión serial RS-232 directo o adaptador USB a RS-232 (marcas certificadas como Sabrent, FTDI o UGREEN).
- Indicador de peso industrial compatible: **Toledo do Brasil Modelo TC420** (o indicadores estándar continuo RS-232 a 9600 baudios, 8 bits de datos, sin paridad, 1 bit de parada).
- Servicio en segundo plano **Agente Báscula** ejecutándose en el puerto local `http://127.0.0.1:4000`.

---

## 3. ACCESO AL SISTEMA Y NAVEGACIÓN GENERAL

### 3.1. Inicio de Sesión (Login)
Para ingresar al sistema:
1. Abra su navegador web e ingrese la dirección web provista por el administrador (ej. `http://servidor-local:5173/login` o dominio corporativo).
2. Se presentará la pantalla de inicio de sesión de Global Café:
   - **Usuario:** Ingrese su identificador de usuario asignado (ej. `operador`, `bascula`, `lab`, `admin`). *Nota: El sistema previene automáticamente errores de auto-capitalización en dispositivos móviles.*
   - **Contraseña:** Ingrese su clave de seguridad personal.
3. Haga clic en el botón **"Iniciar Sesión"**.
4. Si las credenciales son correctas, el sistema cargará su perfil de seguridad, sucursal autorizada y le redirigirá automáticamente al **Dashboard Operacional**.

> [!CAUTION]
> Sus credenciales son personales e intransferibles. Cada registro, pesada, nota de patio o veredicto de laboratorio queda registrado en la bitácora del sistema con su nombre, fecha y hora exacta. Nunca comparta su contraseña.

---

### 3.2. Estructura de la Interfaz de Usuario
La interfaz está diseñada de forma limpia e intuitiva, dividida en 3 zonas principales:

```
+------------------------------------------------------------------------------------+
|  [Logo Global Café]   [Sucursal Activa]           [Notificaciones] [Usuario / Salir]|
+-------------------+----------------------------------------------------------------+
| MENÚ LATERAL      | CONTENIDO DEL MÓDULO SELECCIONADO                              |
| - Dashboard       |                                                                |
| - Recepción       | [ Encabezado con Título del Módulo y Botones de Acción ]       |
| - Comercial       | -------------------------------------------------------------- |
| - Industrial      | [ Filtros y Buscador Rápido ]                                  |
| - Despacho        | -------------------------------------------------------------- |
| - Ventas Locales  | [ Tabla de Registros / Formularios Operativos ]                |
| - Administración  |                                                                |
+-------------------+----------------------------------------------------------------+
```

1. **Barra Superior (Header):**
   - Muestra el nombre de la empresa y la **Sucursal Activa**.
   - Icono de **Notificaciones en tiempo real** (alertas sobre camiones muestreados, veredictos de gerencia y pesajes pendientes).
   - Menú de perfil de usuario con opción para **Cerrar Sesión** de forma segura.
2. **Menú Lateral de Navegación (Sidebar):**
   - Permite desplazarse entre los diferentes módulos.
   - Cada usuario solo verá desplegadas las opciones a las que su Rol tiene acceso concedido.
3. **Área de Trabajo Central:**
   - Incluye el encabezado de página, buscador interactivo, botones principales (Nuevo, Exportar, Actualizar) y la tabla de datos con paginación y estados por colores.

---

### 3.3. Control de Acceso Basado en Roles (RBAC)
El sistema opera bajo estrictas políticas de roles. Si un usuario no posee el permiso requerido:
- La opción de menú no aparecerá en su pantalla.
- Si intenta acceder por enlace directo, el sistema bloqueará el acceso mostrando la alerta: *"Acceso Denegado: No tiene permisos suficientes para ver esta sección"*.
- Los botones de acciones críticas (como Anular Remisión, Pesar Equipo, Aprobar Muestras o Crear Usuarios) solo se renderizan a usuarios con privilegios autorizados.

---

## 4. DASHBOARD OPERACIONAL

*Ruta de acceso: `Dashboard > Operaciones`*  
*Permiso requerido: Acceso general a la plataforma*

### 4.1. Propósito
Ofrece una vista panorámica en tiempo real del flujo operativo del día, permitiendo a supervisores y jefes de planta detectar cuellos de botella instantáneamente.

```
[📸 Captura de Pantalla: Vista General del Dashboard Operacional]
```

### 4.2. Indicadores Clave de Desempeño (KPIs)
En la parte superior se presentan cuatro tarjetas dinámicas:
1. **Ingresos Hoy:** Número total de vehículos que han arribado a las instalaciones durante la jornada.
2. **Sacos Declarados:** Sumatoria de sacos registrados en los documentos de remisión del día.
3. **Volumen Estimado (QQ):** Volumen total de café en Quintales (QQ) proyectados a ingresar.
4. **Vehículos en Patio:** Conteo de camiones que se encuentran actualmente dentro de las instalaciones en alguna de las etapas del proceso (muestreo, laboratorio, descarga o pesaje).

### 4.3. Bandeja de Tareas Pendientes en Tiempo Real
El sistema agrupa automáticamente los camiones que requieren atención inmediata en su respectiva estación:
- **Esperando Toma de Muestra:** Vehículos registrados en portería listos para que el muestrero extraiga la muestra física.
- **Muestras en Laboratorio:** Muestras que ya ingresaron a la mesa de laboratorio y esperan el ingreso de resultados físicos o sensoriales.
- **Esperando Veredicto de Gerencia:** Muestras fuera de norma o diferencias de faltos que requieren la firma o autorización de Gerencia.
- **Esperando Pesaje en Báscula:** Vehículos autorizados listos para subir a la plataforma de pesaje.

---

## 5. MÓDULO 1: RECEPCIÓN DE CAFÉ (FLUJO OPERATIVO COMPLETO)

Este módulo conforma la columna vertebral del ingreso de café. El flujo sigue una secuencia estricta para garantizar la calidad y transparencia:

```
[ 1. Portería ]    -->   [ 2. Muestreo ]   -->   [ 3. Laboratorio ]  --> [ 4. Báscula Bruto ]
  (Remisión)               (Toma Física)           (Calidad / Taza)         (Pesada Entrada)
                                                         |
                                            ¿Cumple norma de calidad?
                                            /                        \
                                         [SÍ]                       [NO] --> [ Aprobación Gerencia ]
                                           |                                   (Acepta c/castigo o Rechaza)
                                           v
                                 [ 5. WMS Patio / Bodega ]
                                   (Descarga en Estiba)
                                           |
                                 [ 6. Báscula Tara ]
                                   (Pesada Salida)
                                           |
                                 [ 7. Nota de Peso ]
                                   (Liquidación Final)
```

---

### 5.1. Registro de Remisión (Portería)
*Ruta de acceso: `Recepción > Registro de Remisión`*  
*Permisos requeridos: `VER_RECEPCION`, `CREAR_RECEPCION`, `EDITAR_RECEPCION`, `ANULAR_RECEPCION`, `IMPRIMIR_RECEPCION`*

```
[📸 Captura de Pantalla: Pantalla de Registro de Remisiones y Listado de Ingresos]
```

#### A. Objetivo
Registrar el arribo formal del transporte de café a la entrada del beneficio, capturando los datos documentales del productor/proveedor, el transportista y la carga declarada.

#### B. Paso a Paso para Registrar un Nuevo Ingreso
1. En la pantalla principal de Remisión, haga clic en el botón superior **"+ Nueva Remisión"**.
2. Se abrirá la ventana modal de registro dividida en secciones lógicas:
   - **Datos de la Entrada:**
     * **Cosecha:** Seleccione la cosecha activa (el sistema precarga por defecto la cosecha en curso, ej. *2025-2026*).
     * **Tipo de Remisión:** Elija si es *Compra Directa, Traslado entre Sucursales, Café en Depósito o Maquila*.
     * **Fecha y Hora de Entrada:** Registra automáticamente el timestamp actual del sistema.
   - **Datos del Proveedor y Origen:**
     * **Proveedor / Productor:** Seleccione el nombre o RTN del productor del catálogo.
     * **Departamento y Municipio:** Seleccione la procedencia geográfica exacta de la carga.
   - **Datos del Transporte y Vehículo:**
     * **Empresa de Transporte:** Nombre de la empresa transportista.
     * **Placa Cabezal:** Placa del camión o cabezal tractor.
     * **Placa Furgón / Remolque:** Placa del remolque o contenedor (opcional según el tipo de transporte).
     * **Conductor:** Nombre y número de documento del chofer.
   - **Detalle de la Carga de Café:**
     * **No. de Remisión / Guía:** Número correlativo de la hoja de remisión física del proveedor.
     * **Tipo de Café:** Especifique si es *Café Pergamino Seco, Pergamino Húmedo, Café Uva, Café Oro o Cereza*.
     * **Tipo de Empaque:** Seleccione *Sacos de Yute, Sacos Plásticos (Polipropileno), Granel o Big Bags*.
     * **Sacos Declarados:** Cantidad de bultos declarados por el chofer.
     * **Quintales Declarados (QQ):** Peso aproximado manifestado en la guía.
     * **Observaciones:** Cualquier anomalía visible en el camión (ej. carpa rota, sacos húmedos por lluvia).
3. Haga clic en **"Guardar Ingreso"**.
4. El sistema generará automáticamente un **Número de Entrada Correlativo único** (ej. `ING-2026-0045`) y el vehículo quedará en estado: **"Pendiente de Muestrear"**.

#### C. Acciones Disponibles en la Tabla de Remisiones
- **Buscar:** Filtre por número de ingreso, remisión, placa o nombre del proveedor.
- **Editar:** Permite corregir datos tipográficos antes de que la carga sea pesada o procesada.
- **Imprimir Boleta de Ingreso:** Genera la hoja de ruta que acompañará físicamente al conductor a través de los puntos de control interno.
- **Anular:** Si el camión se retira antes de descargar o se digitó por duplicado, se puede anular justificando el motivo en el sistema.

---

### 5.2. Muestreo en Patio
*Ruta de acceso: `Recepción > Muestreo en Patio`*  
*Permisos requeridos: `VER_MUESTREO`, `VER_ACCIONES_MUESTREO`*

```
[📸 Captura de Pantalla: Pantalla de Muestreo en Patio con Cargas Pendientes]
```

#### A. Objetivo
Controlar la toma física de muestras directamente sobre la plataforma del camión utilizando el calador o sonda estándar, antes de autorizar la descarga del vehículo.

#### B. Paso a Paso
1. En la lista de **Cargas Pendientes de Muestrear**, ubique el vehículo por su número de entrada o placa.
2. Haga clic en el botón de acción **"Muestrear"** (icono de matraz/laboratorio).
3. Aparecerá el modal de confirmación con los datos de la remisión y la cantidad de sacos declarados.
4. Una vez extraída la muestra representativa (mínimo según norma IHCAFE/SCAA en función del número de sacos), ingrese si existe alguna observación preliminar y presione **"Confirmar Toma de Muestra"**.
5. El sistema actualiza de forma automática el estado de la carga a: **"Muestreado"**, transfiriendo la orden a la pantalla del laboratorio de calidad.

---

### 5.3. Laboratorio de Calidad y Catación
*Ruta de acceso: `Recepción > Laboratorio`*  
*Permisos requeridos: `VER_MUESTRA`, `VER_ACCION_MUESTRA`, `CREAR_MUESTRA`, `IMPRIMIR_MUESTRA`, `REIMPRESION_ANALISIS_INGRESO`*

```
[📸 Captura de Pantalla: Registro de Análisis de Calidad y Análisis Sensorial]
```

#### A. Objetivo
Determinar con rigor científico el estado físico, los defectos, el rendimiento industrial y el perfil organoléptico (taza) de la muestra de café recibida.

#### B. Dos Tipos de Análisis Soportados
1. **Muestra Previa:** Se efectúa inmediatamente tras el muestreo en patio, para decidir si el camión es apto para ingresar a descarga o si debe ser rechazado.
2. **Muestra General:** Se efectúa una vez que el café ha sido descargado y estibado en bodega, para ratificar la calidad final del lote acumulado.

#### C. Paso a Paso para Registrar el Análisis de Calidad
1. En la tabla de muestras pendientes, seleccione el registro y haga clic en **"Registrar Análisis"**.
2. **Datos Generales del Laboratorio:**
   - **Catador Responsable:** Seleccione al catador certificado del catálogo.
   - **Calidad Estimada:** Calificación del grano (*SHG - Strictly High Grown, HG - High Grown, Central Estándar, Micro-lote / Café Especial*).
3. **Parámetros Físicos:**
   - **Humedad (%):** Lectura del medidor de humedad calibrado (ej. 11.5% a 12.5% es el rango óptimo comercial).
   - **Rendimiento Primer Peso (libras):** Muestra base (ej. 250 g).
   - **Rendimiento Segundo Peso (libras):** Café oro limpio obtenido.
   - **Porcentaje de Rendimiento (%):** Cálculo automático del rendimiento comercial.
4. **Análisis de Defectos:**
   - Ingrese el conteo o peso de defectos encontrados: *Granos negros, agrios, brocados, inmaduros, partidos, conchas o materia extraña*.
   - El sistema calcula el total de daño físico.
5. **Clasificación por Zarandas (Granulometría):**
   - Ingrese los porcentajes retenidos en cada malla: *Zaranda 19, 18, 17, 16, 15 y menores*.
6. **Análisis Sensorial de Taza (Catación SCAA):**
   - Evaluación de atributos: *Fragancia/Aroma, Sabor, Sabor Residual, Acidez, Cuerpo, Balance, Uniformidad, Taza Limpia, Dulzor y Puntaje Global*.
   - Notas de cata descriptivas (ej. *notas a chocolate, cítricos, floral, miel*).
7. Haga clic en **"Guardar y Emitir Análisis"**.

#### D. Regla de Negocio Crítica: Derivación Automática a Gerencia
- Si la humedad supera los límites estipulados por la empresa (ej. > 13.0%) o el porcentaje de daños/defectos excede la tolerancia permitida:
  - El sistema **NO autoriza directamente la descarga**.
  - Pone la carga en estado: **"Muestra Previa Pendiente de Aprobación"**.
  - La transacción queda bloqueada para la báscula y el patio hasta que el Gerente emita un veredicto formal.
- Si la muestra se encuentra dentro de los parámetros conformes:
  - El sistema cambia el estado a **"Pendiente de Pesada Inicial"**, habilitando el vehículo en la caseta de báscula.

---

### 5.4. Báscula de Entrada (Pesaje Bruto y Salida de Cabezal)
*Ruta de acceso: `Recepción > Báscula de Entrada`*  
*Permisos requeridos: `VER_BASCULA`, `PESAR_EQUIPO`, `CAMBIO_DE_CABEZAL`*

```
[📸 Captura de Pantalla: Pantalla de Báscula Industrial con Captura de Peso en Tiempo Real]
```

#### A. Objetivo
Registrar el peso bruto del vehículo cargado que ingresa al beneficio, garantizando la exactitud mediante la conexión directa con el indicador industrial.

#### B. Modos de Operación en Báscula
1. **ENTRADA (Pesada de Entrada / Peso Bruto):**
   - El camión sube a la plataforma de la báscula.
   - El operador selecciona el vehículo en la tabla y presiona **"Pesar Entrada"**.
   - En la ventana modal, hace clic en el botón **"Capturar Peso Báscula"**.
   - El sistema invoca al *Agente de Báscula* local, captura el peso estabilizado del indicador Toledo TC420 y lo coloca en el campo de peso de forma no editable (protegido contra digitación manual).
   - Se asigna la **Bodega de Descarga** designada para este tipo de café.
   - Se presiona **"Guardar Pesada"**.
   - Se genera e imprime la **Boleta de Pesada de Entrada**.
   - El vehículo pasa al estado: **"Pesada Abierta"** y queda listo para avanzar a la zona de patios.

2. **SALIDA CABEZAL / ENTRADA CABEZAL (Operación Especial de Furgones):**
   - Diseñado para beneficios donde un cabezal tractor deja un contenedor o furgón descargando durante varias horas o días y se retira del beneficio para trabajar con otro remolque.
   - El operador selecciona **"Salida de Cabezal"**, registra el peso del cabezal que se marcha y el sistema desvincula temporalmente la unidad motora.
   - Al finalizar la descarga, cuando el furgón vaya a salir, se registra la **"Entrada de Cabezal"** (pudiendo ser el mismo cabezal u otro diferente asignado), garantizando que el cálculo de la tara sea matemática y legalmente exacto.

---

### 5.5. Omitir Análisis (Excepción Operativa)
*Ruta de acceso: `Recepción > Omitir Análisis`*  
*Permiso requerido: `VER_OMITIR_ANALISIS`*

```
[📸 Captura de Pantalla: Pantalla de Excepción y Omisión de Análisis Previo]
```

#### A. Objetivo
Permitir el avance directo a báscula y descarga para aquellas cargas que por razones contractuales o logísticas no requieren muestreo y análisis previo en patio (por ejemplo: café en uva para despulpado inmediato, traslados internos de lotes ya certificados en otra sucursal o acuerdos de compra con análisis posterior).

#### B. Procedimiento y Auditoría
- Esta acción requiere autorización expresa y queda registrada en la bitácora (`LogSistema`) indicando el usuario, motivo y fecha.
- Al confirmar la omisión, el vehículo pasa directamente a estado **"Pendiente de Pesada Inicial"**.

---

### 5.6. WMS Patio y Almacenamiento (Descarga, Estibas y Faltos)
*Ruta de acceso: `Recepción > WMS Patio`*  
*Permisos requeridos: `VER_WMS_PATIO`*

```
[📸 Captura de Pantalla: WMS Patio - Asignación de Estibas y Control de Descarga]
```

#### A. Objetivo
Gestionar la descarga física del café en las bodegas del beneficio, asignando la estiba exacta donde quedará almacenado el grano y controlando discrepancias físicas en el conteo de sacos.

#### B. Paso a Paso para Generar la Nota de Patio
1. En la lista de camiones con pesada abierta, ubique el vehículo que terminó de descargar y haga clic en **"Generar Nota de Patio"**.
2. **Asignación de Ubicación Física:**
   - Seleccione la **Estiba** de destino (ej. *Estiba E-101 Bodega Central*).
   - Ingrese la **Cantidad de Sacos Descargados** (conteo físico en cuadrilla).
3. **Manejo de Diferencias (Faltos o Sobrantes):**
   - El sistema compara los sacos declarados en la remisión original contra los sacos físicos descargados.
   - **Si los sacos coinciden:** Se aprueba la descarga y se emite la Nota de Patio.
   - **Si faltan sacos:** El sistema genera una alerta de **Faltos**. El operador registra la discrepancia. Si la política del beneficio lo requiere, el caso pasa a la bandeja de *Aprobación de Gerencia* para autorizar la liquidación con faltantes o solicitar investigación.
4. **Envío de Muestra General:**
   - La pantalla permite marcar el envío de la muestra compuesta del lote descargado hacia el laboratorio para la certificación definitiva de la estiba.
5. Al completar la nota, el vehículo queda en estado: **"Pendiente de Pesada Final"** y se dirige nuevamente a la báscula de salida.

---

### 5.7. Nota de Peso y Liquidación (Pesaje Tara y Descuentos)
*Ruta de acceso: `Recepción > Nota de Peso`*  
*Permisos requeridos: `VER_NOTA_PESO`, `CREAR_NOTA_PESO`*

```
[📸 Captura de Pantalla: Liquidación Definitiva en Nota de Peso con Descuentos Calculados]
```

#### A. Objetivo
Efectuar la pesada de salida (peso tara del camión vacío) y calcular la liquidación definitiva en peso neto, aplicando los descuentos de ley y de calidad.

#### B. Proceso de Cálculo de la Liquidación
1. El camión completamente vacío sube a la báscula de salida.
2. Se captura el **Peso Tara**.
3. **Cálculo Matemático Automático:**
   $$\text{Peso Bruto} - \text{Peso Tara} = \text{Peso Neto Recibido (Libras o Quintales)}$$
4. En la pestaña **"Pendientes de Liquidar"**, el encargado de liquidaciones abre el registro:
   - Se muestran los resultados del laboratorio: Humedad real y Daño real.
   - **Descuento por Humedad:** Si el café excede el 12.0% estándar (ej. llegó con 14.5%), el sistema calcula la deducción de peso correspondiente por agua evaporable.
   - **Descuento por Daño / Defectos:** Deducción en libras o porcentaje acordado por defectos físicos.
   - **Otros Descuentos:** Retenciones por empaque o deducciones pactadas.
   - **Peso Neto Liquidado:** Peso neto final en Quintales Oro o Pergamino Seco oficial para el pago al productor.
5. Haga clic en **"Generar Nota de Peso"**.
6. El sistema asigna el número oficial correlativo de Nota de Peso (ej. `NP-2026-00128`), cierra la transacción (`Pesada Cerrada`), emite el **Pase de Salida del Vehículo** y permite imprimir la **Boleta Oficial de Liquidación**.

---

### 5.8. Aprobación de Gerencia
*Ruta de acceso: `Recepción > Aprobación Gerencia`*  
*Permisos requeridos: `VER_APROBACIONES`, `APROBAR_MUESTRA`*

```
[📸 Captura de Pantalla: Módulo de Decisiones de Gerencia - Aprobaciones y Rechazos]
```

#### A. Objetivo
Proveer al Administrador General o Gerente de Planta un centro de control para decidir sobre cargas conflictivas o fuera de los estándares de recepción.

#### B. Pestaña 1: Aprobaciones de Calidad
- Muestra los vehículos cuyas muestras arrojaron parámetros anormales (humedad excesiva, fermento, taza contaminada o granos dañados).
- El Gerente visualiza la ficha completa del laboratorio.
- **Acciones Gerenciales:**
  1. **Aprobar con Castigo:** Autoriza el ingreso del camión aplicando una tasa de penalización o descuento extraordinario en la liquidación.
  2. **Rechazar Carga:** Emite orden de rechazo inmediato. El sistema genera el **Documento de Devolución** para que el transportista abandone el beneficio sin descargar.

#### C. Pestaña 2: Decisión de Faltos en Patio
- Lista las discrepancias de bultos detectadas durante la descarga.
- El Gerente puede **Autorizar la recepción con la cantidad real descargada** o **Instruir el ajuste correspondiente**.

---

### 5.9. Matriz de Estados de la Transacción de Recepción

| ID Estado | Nombre del Estado | Significado Operativo | Siguiente Paso Obligatorio |
| :---: | :--- | :--- | :--- |
| **1** | `Pendiente de Muestrear` | Vehículo registrado en portería con remisión emitida. | Cuadrilla de patio toma muestra física. |
| **2** | `Muestreado` | Muestra física extraída en patio. | Análisis en Laboratorio de Calidad. |
| **3** | `Muestra Previa Pendiente de Aprobacion` | La muestra no cumplió parámetros estándar de calidad. | Veredicto de Aprobación/Rechazo de Gerencia. |
| **4** | `Pendiente de Pesada Inicial` | Carga autorizada para pesaje inicial. | Subir a plataforma de báscula de entrada. |
| **5** | `Pesada Abierta` | Peso bruto capturado y registrado con éxito. | Avanzar a patio y bodega para descargar. |
| **6** | `Muestra General Recibida` | Café descargado en estiba; muestra general en lab. | Certificación final de laboratorio. |
| **7** | `Pendiente de Pesada Final` | Descarga terminada y Nota de Patio completada. | Báscula de salida para pesaje tara. |
| **8** | `Pesada Cerrada` | Tara capturada y Nota de Peso emitida. | Pase de salida entregado al chofer. Proceso terminado. |

---

## 6. MÓDULO 2: GESTIÓN COMERCIAL

*Ruta de acceso: Menú `Comercial`*  
*Permisos: `VER_CONTRATOS`, `VER_LAB_PREEMBARQUE`, `VER_APROBACIONES_CLIENTE`, `VER_LOTES`, `VER_SI`, `VER_INVENTARIO`*

```
[📸 Captura de Pantalla: Gestión de Contratos de Venta y Lotes de Exportación]
```

### 6.1. Contratos de Venta (`comercial/contratos`)
- **Propósito:** Registro y administración de compromisos comerciales con compradores internacionales (tostadores, importadores) y locales.
- **Campos principales:** Número de contrato, Cliente (ej. *Starbucks Corp, Nestle AG, Lavazza SpA*), Fecha de firma, Cantidad pactada en sacos o quintales, Precio pactado por saco/quintal, Destino final y Estado (*Pendiente, En Proceso, Aprobado, Cumplido*).
- **Operación:** Permite crear nuevos contratos, filtrar por cliente y dar seguimiento al cumplimiento de entregas.

### 6.2. Laboratorio Pre-Embarque (`comercial/lab-preembarque`)
- **Propósito:** Registro del análisis de calidad efectuado sobre muestras compuestas preparadas para cumplir con los requerimientos específicos del comprador antes de proceder al trillado o despacho.

### 6.3. Aprobación del Cliente (`comercial/aprobacion`)
- **Propósito:** Registro de la confirmación formal (aprobación de muestra de oferta o pre-embarque) por parte del comprador en el extranjero para autorizar el armado del lote y la trilla.

### 6.4. Generación de Lotes (`comercial/lotes`)
- **Propósito:** Agrupación y trazabilidad de estibas de café pergamino para conformar un lote comercial homogéneo asociado a uno o varios contratos de exportación.

### 6.5. Instrucciones de Embarque (Shipping Instructions - SI) (`comercial/instrucciones-embarque`)
- **Propósito:** Gestión de la información logística internacional: Naviera contratada, Línea de reserva (Booking), Agente aduanal, Puerto de embarque (ej. *Puerto Cortés*), Puerto de destino, Consignatario y marcas requeridas en los sacos.

### 6.6. Inventario Pergamino (`comercial/inventario-pergamino`)
- **Propósito:** Consulta consolidada en tiempo real de las existencias de café pergamino seco disponibles en todas las bodegas y estibas del beneficio, clasificadas por calidad, origen y estado.

---

## 7. MÓDULO 3: GESTIÓN INDUSTRIAL (BENEFICIO SECO)

*Ruta de acceso: Menú `Industrial`*  
*Permisos: `VER_PROGRAMA`, `VER_ORDEN_SACOS`, `VER_TRILLA`, `VER_BALANCE_MASAS`, `VER_PRODUCTO_TERMINADO`, `VER_REMANENTE`*

```
[📸 Captura de Pantalla: Monitoreo en Vivo de Máquinas Trilladoras y Balance de Masas]
```

### 7.1. Programa de Producción (`industrial/programa`)
- Planificación semanal o diaria de las órdenes de trilla y preparación de café en planta según las fechas de embarque programadas.

### 7.2. Orden de Sacos y Empaque (`industrial/orden-sacos`)
- Solicitud y asignación de sacos de exportación (yute de 69 kg, bolsas herméticas GrainPro, hilo de coser y marchamos) requeridos para el lote a procesar.

### 7.3. Proceso de Trilla (`industrial/trilla`)
- **Monitoreo en Tiempo Real de Maquinaria:** Control de estado de máquinas (*Trilladora 1, Trilladora 2, Clasificadoras ópticas, Densimétricas*).
- **Seguimiento del Avance:** Registro de sacos de pergamino ingresados a tolva vs. sacos de café oro limpio obtenidos.
- **Botones de Control:** Pausar / Iniciar máquinas y cierre de orden de proceso.

### 7.4. Balance de Masas (`industrial/balance-masas`)
- **Conciliación Industrial:** Cuadre cuantitativo exacto que verifica:
  $$\text{Pergamino Procesado} = \text{Café Oro Exportable} + \text{Segundas/Tercerías} + \text{Broza / Cascabillo} + \text{Merma Técnica}$$
- Asegura que no existan fugas, pérdidas de café o descalces en el rendimiento industrial pactado.

### 7.5. Producto Terminado (`industrial/producto-terminado`)
- Registro de estibas de café oro procesado, debidamente ensacado, rotulado y almacenado en la bodega de exportación listo para consolidación en contenedor.

### 7.6. Merma y Remanentes (`industrial/merma`)
- Control de saldos sobrantes de café oro o pergamino que no alcanzaron a completar un saco o lote, permitiendo su reasignación a futuros programas de trilla.

---

## 8. MÓDULO 4: DESPACHO Y EXPORTACIÓN

*Ruta de acceso: Menú `Despacho`*  
*Permisos: `VER_CARGA`, `VER_BASCULA_SALIDA`, `VER_DOCUMENTOS`*

```
[📸 Captura de Pantalla: Carga de Contenedores de Exportación y Báscula de Salida]
```

### 8.1. Carga de Contenedor (`despacho/carga`)
- Control de estibado dentro del contenedor marítimo (generalmente 275 a 300 sacos de 69 kg por contenedor de 20 pies).
- Registro del Número de Contenedor, Número de Marchamo de Seguridad (Seal) de la naviera y marchamos aduanales.

### 8.2. Báscula de Salida (`despacho/bascula-salida`)
- Pesaje del camión o cabezal con el contenedor cargado antes de abandonar el beneficio.
- Determinación y emisión del **Peso Bruto Verificado (VGM - Verified Gross Mass)** exigido por las regulaciones marítimas internacionales (Convenio SOLAS).

### 8.3. Documentación Final (`despacho/documentacion`)
- Checklist de verificación y emisión de la carpeta documental del embarque:
  * Boleta de Pesaje Oficial.
  * Factura Comercial de Exportación.
  * Certificado de Origen (IHCAFE).
  * Certificado Fitosanitario (SENASA).
  * Orden de Salida de Planta.

---

## 9. MÓDULO 5: VENTAS LOCALES Y SUBPRODUCTOS

*Ruta de acceso: Menú `Ventas Locales`*  
*Permisos: `VER_KARDEX`, `VER_ORDEN_VENTA`, `VER_BASCULA_VENTA`, `VER_SALIDA`*

```
[📸 Captura de Pantalla: Control de Kardex de Subproductos y Venta Local]
```

### 9.1. Kardex de Subproductos (`ventas/kardex`)
- Control de inventario en tiempo real de los subproductos generados en la trilla: *Broza / Cascabillo, Café consumo nacional, Café de segunda, Ripios y Mancha*.

### 9.2. Orden de Venta Local (`ventas/orden-venta`)
- Registro de pedidos comerciales y facturación a tostadores locales, compradores de subproductos o fabricantes de abono orgánico.

### 9.3. Báscula Venta Local (`ventas/bascula`)
- Pesaje de camiones de compradores locales (peso bruto de entrada y tara de salida).

### 9.4. Salida y Entrega Local (`ventas/salida`)
- Generación del pase de salida local y cierre de inventario en el Kardex.

---

## 10. MÓDULO 6: ADMINISTRACIÓN Y SEGURIDAD

*Ruta de acceso: Menú `Administración`*  
*Permisos requeridos: `VER_USUARIOS`, `VER_ROLES`, `VER_CONFIGURACION`, `VER_CATALOGOS`*

```
[📸 Captura de Pantalla: Módulo de Mantenimiento de Catálogos Maestros y Usuarios]
```

### 10.1. Gestión de Usuarios (`admin/usuarios`)
- **Creación de Usuarios:** Nombre completo, nombre de usuario para login, correo electrónico, teléfono, sucursal base y contraseña inicial.
- **Asignación de Roles:** Asignación de uno o más perfiles operativos al usuario.
- **Activación / Desactivación:** Bloqueo inmediato de acceso para colaboradores dados de baja sin borrar su historial histórico.

### 10.2. Roles y Matriz de Permisos (`admin/roles`)
- Creación de perfiles de trabajo a la medida (ej. *Supervisor de Patio, Catador Principal, Jefe de Báscula, Auditor*).
- **Asignación Granular de Permisos:** Matriz interactiva para encender o apagar privilegios específicos por módulo (ver, crear, editar, anular, imprimir, aprobar).

### 10.3. Mantenimiento de Catálogos Maestros (`admin/catalogos`)
El sistema centraliza 18 catálogos operacionales para evitar errores de escritura y estandarizar la información:
1. **Proveedores / Productores:** Nombre, RTN, teléfono, correo, dirección.
2. **Empresas de Transporte:** Razón social y datos de contacto.
3. **Conductores:** Nombres, apellidos, número de licencia de conducir.
4. **Placas de Cabezal:** Matrícula y descripción del cabezal.
5. **Placas de Furgón / Remolque:** Matrícula de remolques y plataformas.
6. **Cosechas:** Años cafetaleros (ej. 2024-2025, 2025-2026) y marca de cosecha activa.
7. **Departamentos:** Departamentos del país.
8. **Municipios:** Municipios vinculados a su departamento para trazabilidad de origen.
9. **Catadores:** Lista de catadores autorizados y números de certificación.
10. **Calidades de Café:** Denominaciones comerciales (SHG, HG, Estándar, Orgánico, etc.).
11. **Tipos de Defectos:** Catálogo de defectos físicos del grano.
12. **Zarandas:** Mallas estándar de clasificación de tamaño (14 a 20).
13. **Atributos de Taza:** Descriptores y criterios de catación.
14. **Bodegas:** Edificios y naves de almacenamiento físico.
15. **Estibas:** Ubicaciones y códigos de ruma dentro de cada bodega.
16. **Tipos de Café:** Formas del fruto (Pergamino seco, húmedo, cereza, oro).
17. **Tipos de Remisión:** Modalidad de ingreso (Compra, Traslado, Depósito).
18. **Tipos de Empaque:** Envase utilizado (Yute, Plástico, Big Bag, Granel).

### 10.4. Configuración Visual y Parámetros (`admin/configuracion`)
- Carga del logotipo corporativo de la empresa.
- Personalización de la paleta de colores del sistema.
- Configuración de encabezados y pies de página en las boletas oficiales e impresiones.

---

## 11. GUÍA DE OPERACIÓN DEL AGENTE DE BÁSCULA INDUSTRIAL

### 11.1. ¿Cómo funciona la captura automática de peso?
Para blindar el sistema contra digitación fraudulenta de pesos, Global Café no permite escribir el peso con el teclado. El sistema se comunica con un servicio local:
1. El indicador **Toledo TC420** envía constantemente por el cable serial RS-232 una trama de texto (ej. `\x02 0015420 \x03`).
2. El script **Agente Báscula** (`agente_bascula.py`) escucha en la PC de la caseta en el puerto COM configurado (ej. `COM1`).
3. El agente limpia los caracteres especiales y extrae el valor numérico exacto (`15420.00`).
4. Cuando el operador presiona **"Capturar Peso Báscula"** en el navegador, el sistema consulta `http://127.0.0.1:4000/peso` e inyecta la lectura instantáneamente.

```
[ Indicador Toledo TC420 ]
          |  (Cable Serial RS-232 / DB9)
          v
[ PC Caseta de Báscula (Puerto COM1) ]
          |
[ Agente Báscula (Python localhost:4000) ]
          |  (Petición HTTP interna vía navegador)
          v
[ Pantalla Global Café (Báscula Entrada / Salida) ]
```

### 11.2. Paso a Paso para Operar en la Caseta de Pesaje
1. Verifique que el indicador de peso esté encendido y marcando un peso estable en pantalla (sin fluctuación por viento o movimiento del camión).
2. Asegúrese de que el camión esté completamente posicionado dentro de la plataforma (las cuatro ruedas y remolque dentro de los límites de pesaje).
3. En el sistema Global Café, abra el modal de pesada del camión correspondiente.
4. Haga clic en el botón azul **"Capturar Peso"**.
5. Verifique que el número reflejado en la casilla coincida exactamente con la carátula del indicador Toledo.
6. Guarde la pesada e imprima la boleta.

### 11.3. Diagnóstico Rápido ante Fallas en Báscula

| Problema Observado | Causa Probable | Solución Inmediata |
| :--- | :--- | :--- |
| El sistema muestra: *"Báscula desconectada o puerto ocupado"* | El cable serial está desconectado o el Agente no está abierto. | 1. Verifique que el cable gris RS-232 esté firmemente atornillado a la PC.<br>2. Verifique que la ventana del Agente de Báscula esté iniciada. |
| El peso capturado aparece en `0.00` | El camión se movió durante la lectura o la báscula envió caracteres corruptos. | Pida al chofer apagar el motor y presione nuevamente *"Capturar Peso"*. |
| El navegador dice: *"Error de conexión con el agente local"* | El antivirus o firewall bloqueó el puerto 4000. | Añadir excepción local para `127.0.0.1:4000` en el Firewall de Windows. |

---

## 12. PREGUNTAS FRECUENTES (FAQ) Y RESOLUCIÓN DE PROBLEMAS

### Q1: ¿Qué debo hacer si una remisión se guardó con el número de placa o chofer equivocado?
**R:** Si la remisión aún no ha sido pesada en báscula, el usuario con permiso `EDITAR_RECEPCION` puede hacer clic en el botón de edición (icono de lápiz) en la tabla de remisiones, corregir los datos y presionar guardar. Si ya fue pesada, solo el Administrador puede efectuar correcciones de auditoría.

### Q2: ¿Por qué un camión que ya fue muestreado no aparece en la báscula de entrada?
**R:** Esto ocurre cuando el análisis del laboratorio arrojó valores fuera de norma (ej. humedad muy alta o defectos excesivos) y el sistema lo transfirió automáticamente a la bandeja de **Aprobación de Gerencia**. Hasta que el Gerente no apruebe la muestra en `Recepción > Aprobación Gerencia`, la báscula no se habilitará por seguridad.

### Q3: ¿Cómo se maneja un camión que descarga café en dos bodegas o estibas distintas?
**R:** En la pantalla de WMS Patio, la Nota de Patio permite registrar entregas parciales dividiendo la carga entre dos o más estibas con sus respectivos conteos de sacos físicos antes de cerrar la nota.

### Q4: ¿Qué ocurre si se va la energía eléctrica o el internet mientras un camión está en báscula?
**R:** Todas las transacciones se guardan de forma atómica en la base de datos PostgreSQL. Al regresar el fluido o reconectar el equipo, la pesada o remisión continuará exactamente en el último estado confirmado sin pérdida de datos.

### Q5: ¿Cómo reimprimir una Boleta de Pesada o Pase de Salida antiguo?
**R:** En la pantalla de Báscula de Entrada, haga clic en el botón superior **"Reimpresión de Boletas"**. Ingrese el número de entrada o fecha para buscar el documento histórico e imprimir una copia con sello de duplicado.

---

## 13. GLOSARIO DE TÉRMINOS OPERATIVOS

- **Café Pergamino:** Grano de café cubierto por la cáscara protectora vegetal (endocarpio). Es la forma más habitual de compra y almacenamiento en los beneficios secos.
- **Café Oro (Verde):** Grano de café limpio, desprovisto de pergamino y pulpa, listo para ser exportado o tostado.
- **Saco Estándar:** Bulto de café con un peso nominal regulado (típicamente 69.0 kg o 152.12 libras en exportación; 100 libras en quintales españoles).
- **Quintal (QQ):** Unidad de medida cafetalera equivalente a 100 libras (45.36 kg).
- **Rendimiento:** Proporción cuantitativa que determina cuántas libras de café pergamino se requieren para producir un quintal de café oro exportable (ej. factor 1.25 o porcentaje de rendimiento).
- **Catación:** Prueba organoléptica estandarizada donde se evalúa el perfil aromático, acidez, cuerpo y limpieza de la taza de café.
- **Estiba:** Arreglo vertical y ordenado de sacos de café sobre tarimas de madera en una bodega, identificado con un código único para control de inventario y trazabilidad.
- **Tara:** Peso del vehículo de transporte completamente vacío (sin carga de café).
- **Peso Bruto:** Peso total del vehículo que incluye el camión, conductor, combustible y la carga completa de café.
- **Peso Neto:** Peso real de la masa de café, resultado de restar el peso tara del peso bruto.
- **Marchamo (Seal):** Sello de seguridad numerado e inviolable colocado en las manijas del contenedor marítimo para certificar que la carga no fue abierta durante el trayecto hacia el puerto.
- **VGM (Verified Gross Mass):** Peso bruto verificado del contenedor marítimo exigido por la normativa marítima internacional SOLAS antes de cargarlo a un buque.
- **RBAC (Role-Based Access Control):** Modelo de seguridad informática que restringe las acciones y accesos al sistema según el rol y funciones de cada empleado.

---
*Manual oficial elaborado para Global Café. Todos los derechos reservados.*
