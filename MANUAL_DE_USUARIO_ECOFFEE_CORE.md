# MANUAL DE USUARIO FINAL — eCoffee Core
## Sistema Integral de Gestión de Recepción y Control de Café
### Desarrollado por Corebase | Guía Operativa para: Global Café S.A.

---

| FICHA TÉCNICA DEL MANUAL | |
| :--- | :--- |
| **Sistema:** | **eCoffee Core** |
| **Desarrollador y Titular de Derechos:** | **Corebase** |
| **Propiedad Intelectual:** | Todos los derechos reservados © 2026 Corebase |
| **Empresa Licenciataria / Cliente:** | **Global Café S.A.** |
| **Versión del Documento:** | 1.0 — Manual de Usuario Final |
| **Fecha:** | Septiembre 2026 |
| **Dirigido a:** | Personal de Portería, Muestreo, Laboratorio de Calidad, Báscula, Bodega/Patio, Liquidaciones y Gerencia de Planta |
| **Módulos Cubiertos:** | Dashboard Operacional, Recepción de Café y Administración del Sistema |

---

## ÍNDICE DE CONTENIDO

1. [BIENVENIDA Y CONCEPTOS GENERALES](#1-bienvenida-y-conceptos-generales)
2. [CÓMO INGRESAR Y SALIR DEL SISTEMA (LOGIN)](#2-cómo-ingresar-y-salir-del-sistema-login)
3. [DASHBOARD OPERACIONAL (PANTALLA PRINCIPAL)](#3-dashboard-operacional-pantalla-principal)
4. [MÓDULO DE RECEPCIÓN DE CAFÉ (EL CIRCUITO PASO A PASO)](#4-módulo-de-recepción-de-café-el-circuito-paso-a-paso)
   - 4.1. Registro de Remisión (Portería)
   - 4.2. Muestreo en Patio
   - 4.3. Laboratorio de Calidad y Catación
   - 4.4. Báscula de Entrada (Pesaje Bruto y Desenganche de Cabezal)
   - 4.5. Omitir Análisis (Procedimiento Especial)
   - 4.6. WMS Patio y Almacenamiento (Descarga, Estibas y Faltos)
   - 4.7. Nota de Peso y Liquidación (Pesaje Tara y Boleta Final)
   - 4.8. Aprobaciones de Gerencia (Calidad y Diferencias de Sacos)
   - 4.9. Resumen Visual del Viaje del Camión
5. [MÓDULO DE ADMINISTRACIÓN](#5-módulo-de-administración)
   - 5.1. Gestión de Usuarios
   - 5.2. Asignación de Funciones a Puestos de Trabajo
   - 5.3. Mantenimiento de Catálogos Maestros (18 Catálogos)
   - 5.4. Configuración de la Empresa
6. [GUÍA PRÁCTICA DEL PESADOR (BÁSCULA INDUSTRIAL TOLEDO TC420)](#6-guía-práctica-del-pesador-báscula-industrial-toledo-tc420)
7. [PREGUNTAS FRECUENTES Y SOLUCIÓN DE PROBLEMAS HABITUALES](#7-preguntas-frecuentes-y-solución-de-problemas-habituales)

---

## 1. BIENVENIDA Y CONCEPTOS GENERALES

Bienvenido a **eCoffee Core**, la solución tecnológica desarrollada y de propiedad intelectual exclusiva de **Corebase**, implementada para **Global Café S.A.** con el objetivo de facilitar, agilizar y transparentar todo el proceso de recepción, control de calidad, pesaje y almacenamiento de café.

### ¿Qué hace el sistema por ti en tu día a día?
- **Evita dobles digitaciones:** La información que se registra en portería viaja de forma instantánea al patio, al laboratorio y a la báscula.
- **Elimina errores de cálculo:** El sistema calcula de forma automática los descuentos por humedad, los porcentajes de rendimiento, los defectos físicos y los pesos netos exactos.
- **Conexión directa con la báscula:** El peso del camión se toma directamente del indicador industrial, evitando tecleos manuales y dudas sobre el peso real.
- **Control en tiempo real:** Todo el equipo de trabajo sabe exactamente en qué punto del beneficio se encuentra cada vehículo y qué tarea tiene pendiente.

### Requisitos Básicos para Trabajar:
1. Computadora con navegador web moderno (**Google Chrome** o **Microsoft Edge**).
2. Conexión a la red local del beneficio o Internet estable.
3. Impresora conectada para la emisión de boletas de ingreso, análisis, pesadas y pases de salida.
4. En la caseta de báscula: El indicador de peso encendido y el servicio de báscula activo en la computadora.

---

## 2. CÓMO INGRESAR Y SALIR DEL SISTEMA (LOGIN)

```
[📸 Captura de Pantalla: Pantalla de Inicio de Sesión de eCoffee Core]
```

### 2.1. Inicio de Sesión
1. Abra su navegador web (Google Chrome o Microsoft Edge).
2. Escriba la dirección de acceso proporcionada por su supervisor (ejemplo: `http://192.168.1.100:5173` o el enlace web de Global Café).
3. En la pantalla de bienvenida verá dos casillas:
   - **Usuario:** Escriba su nombre de usuario (sin espacios).
   - **Contraseña:** Escriba su contraseña personal.
4. Presione la tecla **Enter** o haga clic en el botón verde **"Iniciar Sesión"**.
5. Al ingresar correctamente, el sistema lo llevará directo al **Dashboard Operacional**.

> [!NOTE]
> Cada usuario tiene configuradas únicamente las pantallas que necesita para su trabajo diario. Si usted es pesador, verá la báscula; si es catador, verá el laboratorio; si es recepcionista, verá remisiones.

### 2.2. Cierre de Sesión Seguro
Al finalizar su turno de trabajo o si va a dejar su computadora desatendida:
1. Diríjase a la esquina superior derecha de la pantalla.
2. Haga clic sobre su nombre de usuario o foto de perfil.
3. Seleccione la opción **"Cerrar Sesión"**.
4. Esto protege su cuenta para que nadie más registre pesadas o movimientos a su nombre.

---

## 3. DASHBOARD OPERACIONAL (PANTALLA PRINCIPAL)

*Ubicación: Menú lateral > `Dashboard` > `Operaciones`*

El **Dashboard** es el panel de control central que le muestra la fotografía viva de lo que está ocurriendo en el beneficio en el turno de hoy.

```
[📸 Captura de Pantalla: Dashboard Operacional con Estadísticas y Tareas Pendientes]
```

### 3.1. Indicadores del Día (Tarjetas Superiores)
En la parte superior verá 4 tarjetas que se actualizan automáticamente:
- **Ingresos Hoy:** Número total de vehículos que han cruzado la portería durante la jornada.
- **Sacos Declarados:** Cantidad total de bultos de café manifestados en las guías de transporte del día.
- **Volumen Estimado (QQ):** Estimación de quintales de café que ingresarán hoy a la planta.
- **Vehículos en Patio:** Conteo de camiones que están actualmente adentro del beneficio en alguna etapa (esperando muestra, en análisis, en descarga o en báscula).

### 3.2. Bandeja de Pendientes en Tiempo Real
Debajo de las tarjetas, el sistema agrupa en qué estación está detenido el flujo:
- **Esperando toma de muestra:** Camiones que ya pasaron portería y esperan al muestrero en patio.
- **Muestras en laboratorio:** Muestras que ya están sobre la mesa del laboratorio pendientes de ser analizadas o catadas.
- **Esperando veredicto de gerencia:** Cargas que tuvieron problemas de humedad o daños y esperan la decisión del gerente.
- **Esperando pesaje en báscula:** Camiones listos para subir a la plataforma de pesaje.

> [!TIP]
> Puede hacer clic directamente sobre cualquiera de estas tareas pendientes para saltar de inmediato a esa pantalla sin necesidad de buscar en el menú.

### 3.3. Actividad Reciente
En el costado derecho se muestra un historial con los últimos ingresos registrados, indicando la hora exacta, el transportista, la cantidad de sacos y los quintales declarados.

---

## 4. MÓDULO DE RECEPCIÓN DE CAFÉ (EL CIRCUITO PASO A PASO)

El ingreso de café sigue una ruta ordenada para garantizar que ningún grano se descargue sin haber sido muestreado, analizado y pesado correctamente:

```
[ 1. Portería ]    ──▶  [ 2. Muestreo ]   ──▶  [ 3. Laboratorio ]  ──▶ [ 4. Báscula Bruto ]
 (Remisión Inicial)       (Toma en Patio)       (Humedad y Calidad)      (Pesada de Entrada)
                                                        │
                                            ¿Cumple norma de calidad?
                                            ┌───────────┴───────────┐
                                          [SÍ]                     [NO] ──▶ [ Gerencia ]
                                           │                                 (Autoriza o Devuelve)
                                           ▼
                                 [ 5. Patio / Bodega ]
                                   (Descarga en Estiba)
                                           │
                                 [ 6. Báscula Tara ]
                                   (Pesada de Salida)
                                           │
                                 [ 7. Nota de Peso ]
                                   (Liquidación y Cierre)
```

---

### 4.1. Registro de Remisión (Portería)
*Ubicación: Menú lateral > `Recepción` > `Registro de Remisión`*

```
[📸 Captura de Pantalla: Listado de Remisiones y Botón Nueva Remisión]
```

#### ¿Para qué sirve?
Es el primer paso del proceso. Aquí el personal de recepción o portería registra la llegada del camión y los datos que vienen en la guía física de traslado que entrega el conductor.

#### Paso a Paso para Registrar un Ingreso:
1. En la esquina superior derecha, haga clic en el botón azul **"+ Nueva Remisión"**.
2. Complete la ventana de registro:
   - **Cosecha:** Seleccione la cosecha activa (el sistema suele precargar la actual, ej. *2025-2026*).
   - **Tipo de Remisión:** Elija el tipo de operación (*Compra Directa, Traslado de Agencia, Depósito o Maquila*).
   - **Proveedor / Productor:** Busque y seleccione el nombre o RTN del productor que entrega el café.
   - **Origen (Departamento y Municipio):** Seleccione de qué zona geográfica proviene la carga.
   - **Empresa de Transporte:** Nombre de la empresa o cooperativa de flete.
   - **Placa Cabezal:** Placa del camión o cabezal.
   - **Placa Furgón:** Placa del remolque o contenedor (si aplica).
   - **Conductor:** Nombre del chofer.
   - **No. de Remisión / Guía:** Número físico impreso en la boleta que trae el conductor.
   - **Tipo de Café:** Especifique si viene como *Pergamino Seco, Pergamino Húmedo, Café Uva o Café Oro*.
   - **Tipo de Empaque:** Elija si viene en *Sacos de Yute, Sacos de Polipropileno (Plástico) o a Granel*.
   - **Sacos Declarados:** Anote cuántos sacos dice la guía que trae el camión.
   - **Quintales Declarados (QQ):** Anote los quintales estimados que indica la remisión.
   - **Observaciones:** Escriba notas relevantes si las hay (ejemplo: *"Sacos mojados por lluvia en el camino"* o *"Carpa rota"*).
3. Presione el botón **"Guardar Ingreso"**.
4. El sistema le asignará un **Número de Entrada único** (ejemplo: `ING-2026-0042`) y el camión quedará en estado: **"Pendiente de Muestrear"**.

#### Acciones en la Tabla:
- **Buscar:** Escriba en la barra de búsqueda cualquier dato (número de ingreso, placa, nombre de productor) para encontrar un camión rápidamente.
- **Imprimir Boleta de Ingreso:** Haga clic en el icono de la impresora en la fila del camión para imprimir la hoja de ruta que el chofer llevará en mano hacia el patio.
- **Editar:** Si cometió un error tipográfico en la placa o el chofer, haga clic en el lápiz para corregirlo antes de que el camión sea pesado.
- **Anular:** Si el camión se retira o se registró dos veces por error, puede anularlo indicando el motivo de la anulación.

---

### 4.2. Muestreo en Patio
*Ubicación: Menú lateral > `Recepción` > `Muestreo en Patio`*

```
[📸 Captura de Pantalla: Pantalla de Muestreo en Patio con Cargas Pendientes]
```

#### ¿Para qué sirve?
Controlar que la cuadrilla de patio tome físicamente la muestra de café directamente de los sacos del camión antes de que este avance a báscula o descarga.

#### Paso a Paso:
1. En la lista verá todos los camiones que acaban de pasar portería.
2. Ubique el camión por su placa o número de ingreso.
3. El muestrero realiza la extracción con la sonda o calador según el estándar del beneficio.
4. En el sistema, haga clic en el botón verde con el icono de matraz **"Muestrear"**.
5. Aparecerá un cuadro de confirmación indicando el número de entrada y los sacos declarados.
6. Haga clic en **"Confirmar Toma de Muestra"**.
7. En ese momento, la carga pasa a estado **"Muestreado"** y se activa de forma automática en la pantalla del laboratorio.

---

### 4.3. Laboratorio de Calidad y Catación
*Ubicación: Menú lateral > `Recepción` > `Laboratorio`*

```
[📸 Captura de Pantalla: Formulario de Análisis Físico y Taza en Laboratorio]
```

#### ¿Para qué sirve?
Registrar los resultados técnicos de los análisis practicados a la muestra de café: porcentaje de humedad, rendimiento físico, defectos y características de taza.

#### Existen 2 Tipos de Muestra en el Sistema:
1. **Muestra Previa:** La que se toma al llegar el camión para decidir si se acepta, se rechaza o requiere visto bueno de gerencia.
2. **Muestra General:** La que se toma de la estiba una vez que el camión ya descargó todo el café en bodega para certificar la calidad final.

#### Paso a Paso para Registrar un Análisis:
1. En la tabla de muestras pendientes, busque el camión y haga clic en **"Registrar Análisis"**.
2. Complete las secciones del formulario:
   - **Catador Responsable:** Seleccione al catador que realizó la prueba.
   - **Calidad Asignada:** Clasifique el café (*SHG, HG, Central Estándar, Café Especial / Micro-lote*).
   - **Humedad (%):** Escriba la lectura del medidor de humedad (ejemplo: `11.8`).
   - **Rendimientos:** Ingrese el peso de la muestra inicial y el peso de café oro limpio obtenido para que el sistema calcule el rendimiento.
   - **Defectos del Grano:** Registre el conteo de defectos encontrados (granos negros, agrios, brocados, partidos, conchas, etc.).
   - **Zarandas (Tamaño del Grano):** Ingrese la retención en mallas (Zaranda 19, 18, 17, 16, etc.).
   - **Catación en Taza:** Ingrese la puntuación de fragancia, sabor, acidez, cuerpo, balance y notas descriptivas (chocolate, cítrico, caramelo, etc.).
3. Haga clic en **"Guardar y Emitir Análisis"**.

#### ¿Qué sucede al guardar?
- **Si el café está en norma:** El sistema lo aprueba de inmediato y lo pasa a estado **"Pendiente de Pesada Inicial"**, habilitándolo en la báscula de entrada.
- **Si el café está fuera de norma (ejemplo: humedad mayor al 13% o exceso de defectos):** El sistema **bloquea el avance a la báscula** y lo transfiere automáticamente a **Aprobación de Gerencia**. El camión no podrá ser pesado hasta que la Gerencia decida si lo recibe con castigo o lo devuelve.
- **Reimpresión:** Si necesita una copia impresa de la hoja de laboratorio, use el botón superior **"Reimpresión de Análisis"**.

---

### 4.4. Báscula de Entrada (Pesaje Bruto y Desenganche de Cabezal)
*Ubicación: Menú lateral > `Recepción` > `Báscula de Entrada`*

```
[📸 Captura de Pantalla: Pantalla del Operador de Báscula y Modal de Pesaje]
```

#### ¿Para qué sirve?
Registrar el peso del vehículo cargado (peso bruto). La báscula de **eCoffee Core** está conectada directamente al indicador industrial para asegurar que el peso sea exacto y sin manipulaciones manuales.

#### Paso a Paso para Pesar un Camión:
1. El conductor posiciona el camión completo sobre la plataforma de la báscula.
2. En la lista de camiones autorizados, ubique la placa correspondiente y haga clic en el botón azul **"Pesar Entrada"**.
3. En la ventana que se abre:
   - Haga clic en el botón **"Capturar Peso Báscula"**.
   - El sistema leerá el indicador Toledo TC420 e inyectará el número en pantalla de forma automática.
   - Seleccione la **Bodega de Descarga** hacia donde se dirigirá el vehículo.
   - Agregue observaciones si nota algo particular en el camión.
4. Haga clic en **"Guardar Pesada"**.
5. Se abrirá la vista de impresión para entregarle al chofer su **Boleta de Pesada de Entrada**.
6. El vehículo pasa al estado **"Pesada Abierta"** y puede ingresar a las bodegas a descargar.

#### Procedimiento Especial: Salida y Entrada de Cabezal (Desenganche de Furgones)
En ocasiones, un cabezal tractor trae un contenedor o furgón, lo deja descargando en bodega y el cabezal se retira a realizar otro viaje:
1. **Para liberar el cabezal:** En la tabla de báscula, seleccione la opción **"Salida de Cabezal"**. El sistema pesa el cabezal que sale, desvincula la unidad motora y deja el furgón descargando con seguridad en patio.
2. **Para retirar el furgón descargado:** Cuando el furgón termina su descarga y otro cabezal (o el mismo) viene a sacarlo, se usa la opción **"Entrada de Cabezal"**. El sistema registra la placa del tractor que se acopla, garantizando que el peso de la tara final sea exacto y no haya descuadres de peso.

---

### 4.5. Omitir Análisis (Procedimiento Especial)
*Ubicación: Menú lateral > `Recepción` > `Omitir Análisis`*

```
[📸 Captura de Pantalla: Pantalla para Omitir Análisis de Laboratorio]
```

#### ¿Cuándo se utiliza?
Se utiliza de forma excepcional para cargas que por su naturaleza no pasan por el laboratorio de calidad al ingresar (por ejemplo: café en uva fresca que va directo al despulpador, café en cereza o traslados de café que ya vienen certificados de otra sucursal de Global Café).

#### Paso a Paso:
1. Ubique el camión en la lista de ingresos.
2. Haga clic en **"Omitir Análisis"**.
3. Escriba claramente la **Justificación** de la omisión (ejemplo: *"Café uva para despulpado inmediato autorizado por jefatura"*).
4. Confirme la acción. El camión se salta el laboratorio y avanza directamente a la báscula de entrada.

---

### 4.6. WMS Patio y Almacenamiento (Descarga, Estibas y Faltos)
*Ubicación: Menú lateral > `Recepción` > `WMS Patio`*

```
[📸 Captura de Pantalla: WMS Patio - Descarga en Estibas y Control de Bultos]
```

#### ¿Para qué sirve?
Llevar el control de qué estiba física de la bodega recibió el café y verificar que la cantidad de sacos descargados coincida exactamente con lo declarado en la remisión.

#### Paso a Paso para Generar la Nota de Patio:
1. Cuando la cuadrilla termina de bajar los sacos del camión, el encargado de bodega/patio busca el camión en la lista y hace clic en **"Generar Nota de Patio"**.
2. **Asignación de Ubicación:**
   - Seleccione la **Estiba** de destino (ejemplo: *Estiba E-102 Bodega Central*).
   - Escriba la **Cantidad de Sacos Descargados** (conteo físico real en mano).
3. **Control de Diferencias:**
   - **Si los sacos coinciden:** Presione guardar. La nota de patio se emite con éxito.
   - **Si faltan sacos (Faltos):** El sistema detecta la diferencia entre lo declarado en remisión y lo que realmente bajó del camión. El encargado registra la observación y el caso se envía a revisión para que la administración determine si se levanta acta de faltante.
4. **Envío de Muestra General:**
   - Se marca la casilla de envío de muestra general compuesta para que el laboratorio haga el análisis de cierre de la estiba.
5. El camión pasa a estado **"Pendiente de Pesada Final"** y se dirige a la báscula de salida.

---

### 4.7. Nota de Peso y Liquidación (Pesaje Tara y Boleta Final)
*Ubicación: Menú lateral > `Recepción` > `Nota de Peso`*

```
[📸 Captura de Pantalla: Liquidación de Nota de Peso y Boleta de Pago]
```

#### ¿Para qué sirve?
Efectuar la pesada de salida del camión completamente vacío (peso tara), calcular los descuentos de calidad y emitir la **Nota de Peso Oficial** para el pago al productor y el **Pase de Salida** del chofer.

#### Paso a Paso de la Liquidación:
1. El camión vacío sube a la báscula de salida.
2. Se captura el **Peso Tara** del vehículo.
3. El sistema calcula en milisegundos:
   $$\text{Peso Bruto} - \text{Peso Tara} = \text{Peso Neto Recibido}$$
4. El liquidador ingresa a la pestaña **"Pendientes de Liquidar"** y selecciona el registro:
   - El sistema carga los datos de humedad y daño del laboratorio.
   - **Descuento por Humedad:** Si el café traía más de la humedad comercial base (12.0%), el sistema calcula cuántas libras de agua se descuentan.
   - **Descuento por Daños:** Si aplica penalización por granos brocados o partidos.
   - **Otros Descuentos:** Retenciones por empaque u otros conceptos pactados.
   - **Peso Neto Liquidado:** Es el resultado final en Quintales Oro o Pergamino Seco oficial a pagar.
5. Presione **"Generar Nota de Peso"**.
6. El sistema genera el número correlativo oficial (ejemplo: `NP-2026-0089`), cambia el estado a **"Pesada Cerrada"** y permite imprimir:
   - La **Nota de Peso Oficial** (para liquidación administrativa y contable).
   - El **Pase de Salida** (para que el conductor pueda cruzar la aguja de portería y salir del beneficio).

---

### 4.8. Aprobaciones de Gerencia (Calidad y Faltos)
*Ubicación: Menú lateral > `Recepción` > `Aprobación Gerencia`*

```
[📸 Captura de Pantalla: Bandeja de Decisiones de Gerencia]
```

#### ¿Para qué sirve?
Es el centro de decisiones exclusivas para el Administrador General o Gerente de Planta. Aquí llegan únicamente los camiones que tuvieron alertas y no pueden continuar sin una orden superior.

#### Tiene 2 Pestañas de Trabajo:
1. **Aprobaciones de Calidad:**
   - Lista las muestras con humedad fuera de rango, fermento o exceso de daño físico.
   - El Gerente puede:
     * **Aprobar con Castigo:** Permite que el camión descargue, pero instruyendo un porcentaje de descuento o castigo en la liquidación final.
     * **Rechazar Carga:** Emite la **Orden de Devolución**. El camión debe retirarse del beneficio sin descargar nada de café.
2. **Aprobaciones de Faltos:**
   - Lista las discrepancias de bultos reportadas por patio.
   - El Gerente decide si se acepta la liquidación con los sacos reales descargados o si se inicia reclamo al transportista.

---

### 4.9. Resumen Visual del Viaje del Camión

| Paso | ¿Dónde ocurre? | ¿Qué se hace? | ¿Qué documento se emite? |
| :---: | :--- | :--- | :--- |
| **1** | Portería | Se anotan datos de remisión, placas, productor y sacos. | Boleta de Ingreso / Hoja de Ruta |
| **2** | Patio | Se extrae muestra física con sonda o calador. | Registro digital "Muestreado" |
| **3** | Laboratorio | Se mide humedad, rendimientos, defectos y taza. | Boleta de Análisis de Calidad |
| **4** | Báscula | Sube camión cargado; se captura peso bruto. | Boleta de Pesada de Entrada |
| **5** | Bodega | Se descargan los sacos y se asignan a la estiba. | Nota de Patio |
| **6** | Báscula | Sube camión vacío; se captura peso tara. | Boleta de Pesada de Salida |
| **7** | Liquidación | Se calculan descuentos y peso neto oficial. | **Nota de Peso Oficial** y **Pase de Salida** |

---

## 5. MÓDULO DE ADMINISTRACIÓN

*Ubicación: Menú lateral > `Administración`*

El módulo de administración permite mantener al día la información operativa de Global Café S.A. para que todos los demás departamentos trabajen sin tropiezos.

```
[📸 Captura de Pantalla: Panel de Mantenimiento de Catálogos y Usuarios]
```

### 5.1. Gestión de Usuarios
*Ruta: `Administración` > `Gestión de Usuarios`*

- **Crear un Nuevo Usuario:** Haga clic en **"+ Nuevo Usuario"**, escriba el nombre completo, el usuario de acceso, el correo, el teléfono, la sucursal asignada y la contraseña provisional.
- **Asignar Funciones:** Marque qué perfil operativo desempeñará el empleado en el sistema.
- **Desactivar Acceso:** Si un empleado ya no labora en el beneficio, cámbielo a estado "Inactivo". Su cuenta se bloqueará de inmediato pero todo su historial de pesadas o análisis se conservará intacto.

### 5.2. Asignación de Funciones a Puestos de Trabajo
*Ruta: `Administración` > `Roles y Permisos`*

Permite definir con precisión qué ve y qué botones puede utilizar cada puesto de trabajo:
- Permite configurar qué pantallas tiene habilitadas cada persona según su área (báscula, laboratorio, portería, liquidación).
- Protege las acciones delicadas (como anular una remisión o aprobar una devolución) para que solo los supervisores designados puedan ejecutarlas.

### 5.3. Mantenimiento de Catálogos Maestros (18 Catálogos)
*Ruta: `Administración` > `Mantenimiento Catálogos`*

Para evitar que los usuarios escriban nombres con faltas de ortografía o nombres duplicados, el sistema cuenta con 18 catálogos predefinidos. Para agregar o modificar un elemento, seleccione la pestaña correspondiente y use el botón **"+ Nuevo"**:

1. **Proveedores / Productores:** Registro de caficultores, cooperativas y fincas con su RTN y datos de contacto.
2. **Empresas de Transporte:** Empresas fleteras autorizadas.
3. **Conductores:** Lista de motoristas y números de licencia de conducir.
4. **Placas de Cabezal:** Matrícula de camiones y tractocamiones.
5. **Placas de Furgón:** Matrícula de remolques, rastras y contenedores.
6. **Cosechas:** Años cafetaleros (ejemplo: *2024-2025*, *2025-2026*) indicando cuál es la cosecha activa en curso.
7. **Departamentos:** Departamentos del territorio nacional.
8. **Municipios:** Municipios vinculados a su departamento para trazabilidad de origen del grano.
9. **Catadores:** Profesionales certificados que firman los análisis.
10. **Calidades de Café:** Denominaciones (*Strictly High Grown - SHG, High Grown - HG, Central Estándar, Orgánico, etc.*).
11. **Tipos de Defectos:** Tipos de daño físico reconocidos en el análisis (granos negros, broca, mordedura de despulpador, etc.).
12. **Zarandas:** Tamaños de malla utilizados en la prueba granulométrica (Zaranda 14 a 19).
13. **Atributos de Taza:** Criterios sensoriales evaluados en mesa (acidez, aroma, cuerpo, dulzor).
14. **Bodegas:** Naves físicas de almacenamiento en el beneficio.
15. **Estibas:** Ubicación y códigos de ruma dentro de cada bodega (ejemplo: *Estiba A-101*).
16. **Tipos de Café:** Presentación del café recibido (*Pergamino Seco, Pergamino Húmedo, Uva, Oro*).
17. **Tipos de Remisión:** Modalidad de ingreso (*Compra Directa, Traslado, Depósito*).
18. **Tipos de Empaque:** Envase de transporte (*Sacos de Yute, Sacos Plásticos, Granel*).

### 5.4. Configuración de la Empresa
*Ruta: `Administración` > `Configuración`*

- **Datos Institucionales:** Nombre oficial de la empresa (**Global Café S.A.**), RTN, dirección, teléfonos de contacto y correo de notificación.
- **Identidad Visual:** Carga del logotipo corporativo que saldrá impreso en las boletas oficiales y configuración de colores de la pantalla.

---

## 6. GUÍA PRÁCTICA DEL PESADOR (BÁSCULA INDUSTRIAL TOLEDO TC420)

Esta sección está pensada exclusivamente para el operador de la caseta de pesaje.

```
[ Indicador Toledo TC420 ] 
          │  (Cable serial RS-232)
          ▼
[ Computadora de Báscula ] ──▶ [ eCoffee Core: Botón "Capturar Peso Báscula" ]
```

### 6.1. Inicio de Turno (Comprobaciones Matutinas)
1. **Encendido:** Encienda el indicador Toledo TC420 al menos 15 minutos antes del primer pesaje para que los componentes electrónicos se estabilicen.
2. **Puesta a Cero:** Verifique que con la plataforma totalmente vacía el indicador marque exactamente `0.00` kg o libras. Si hay desviación, presione la tecla **ZERO** en el teclado del indicador.
3. **Servicio Activo:** Asegúrese de que el programa **Agente de Báscula** esté iniciado en la computadora de la caseta.

### 6.2. Cómo Pesar un Vehículo en 4 Pasos:
1. Pida al conductor ingresar a velocidad lenta y detener el vehículo completamente centrado en la plataforma de pesaje.
2. Solicite al conductor **apagar el motor** (la vibración del motor diésel causa fluctuaciones en la lectura).
3. En la pantalla de **Báscula de Entrada** o **Nota de Peso**, abra el modal de pesada del camión y haga clic en **"Capturar Peso Báscula"**.
4. Observe que el número que aparece en la pantalla del sistema coincida con el número de la pantalla del indicador Toledo. Presione **"Guardar Pesada"** e imprima el comprobante.

### 6.3. Solución Rápida ante Problemas en Báscula:

| Síntoma | ¿Qué está pasando? | ¿Cómo solucionarlo en 1 minuto? |
| :--- | :--- | :--- |
| El sistema dice: *"Báscula desconectada o puerto ocupado"* | El cable serial está flojo o el agente se cerró. | Revise que el cable gris con tornillos esté firme en la parte trasera de la PC y verifique que el agente de báscula esté abierto. |
| El peso capturado sale en `0.00` | El camión se movió o la lectura fue inestable. | Pida al chofer no moverse y presione nuevamente el botón *"Capturar Peso Báscula"*. |
| El navegador dice: *"Error de conexión con el agente local"* | La computadora no tiene comunicación interna con el puerto 4000. | Reinicie la computadora de la caseta o avise al soporte técnico para verificar el firewall. |

---

## 7. PREGUNTAS FRECUENTES Y SOLUCIÓN DE PROBLEMAS HABITUALES

### Q1: ¿Qué hago si guardé una remisión con la placa del camión o el nombre del chofer equivocado?
**Respuesta:** Si el camión **todavía no ha sido pesado**, el encargado de recepción puede buscar el camión en la lista de remisiones, hacer clic en el botón de **Editar** (icono de lápiz), corregir el dato y guardar. Si el camión ya fue pesado, la modificación debe solicitarse al supervisor para garantizar la auditoría.

### Q2: ¿Por qué un camión que ya fue muestreado en patio no aparece en la lista de la báscula?
**Respuesta:** La causa más frecuente es que el análisis de laboratorio arrojó un valor fuera de norma (ejemplo: humedad mayor a 13.0% o exceso de defectos) y el sistema desvió automáticamente la carga a la bandeja de **Aprobación de Gerencia**. Hasta que la Gerencia no revise el caso y presione "Aprobar", la báscula no lo mostrará para evitar descargas no autorizadas.

### Q3: ¿Qué pasa si un camión descarga su café repartido en dos estibas diferentes?
**Respuesta:** En la pantalla de WMS Patio, la Nota de Patio le permite registrar descargas parciales, indicando cuántos sacos fueron a la primera estiba y cuántos a la segunda, cerrando la totalidad del lote con exactitud.

### Q4: ¿Se pierde la información si se corta la energía eléctrica o el internet mientras se está pesando?
**Respuesta:** No. Toda transacción confirmada queda guardada de inmediato en la base de datos central. Al reanudar el fluido eléctrico o la red, el sistema continuará exactamente en el paso donde se encontraba.

### Q5: ¿Cómo reimprimo un Pase de Salida si el chofer lo extravió antes de salir?
**Respuesta:** En la pantalla de **Báscula de Entrada** o **Nota de Peso**, use el botón superior **"Reimpresión de Boletas"**. Busque el camión por su placa o número de ingreso y presione imprimir para generar un duplicado válido.

---
*Manual oficial de usuario final para el sistema eCoffee Core. Copyright © 2026 Corebase. Todos los derechos reservados. eCoffee Core es un producto de software y propiedad intelectual exclusiva de Corebase, implementado bajo licencia de uso para Global Café S.A.*
