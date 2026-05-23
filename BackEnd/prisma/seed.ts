import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 1. Crear Empresa
  const empresa = await prisma.empresa.upsert({
    where: { rtn: '08011990123456' },
    update: {},
    create: {
      nombre: 'Global Café S.A.',
      razon_social: 'Global Café Sociedad Anónima',
      rtn: '08011990123456',
      pais: 'Honduras',
      ciudad: 'Tegucigalpa',
      direccion: 'Colonia Las Lomas',
      telefono: '+504 2233-4455',
      correo: 'contacto@globalcafe.hn',
      moneda_base: 'HNL',
      tipo_cambio_base: 24.50,
      activo: true,
    },
  });

  console.log({ empresa });

  // 2. Configuración Visual de la Empresa
  await prisma.empresaConfiguracionVisual.upsert({
    where: { id_empresa: empresa.id_empresa },
    update: {},
    create: {
      id_empresa: empresa.id_empresa,
      modulo: 'GENERAL',
      tipo_documento: 'ESTANDAR',
      es_configuracion_global: true,
      color_primario: '#f59e0b',
      color_secundario: '#a855f7',
      color_terciario: '#f97316',
      mostrar_logo: true,
    },
  });

  // 3. Crear Sucursal Principal
  const sucursal = await prisma.sucursal.upsert({
    where: { id_empresa_codigo: { id_empresa: empresa.id_empresa, codigo: 'SUC-001' } },
    update: {},
    create: {
      id_empresa: empresa.id_empresa,
      nombre: 'Sucursal Principal',
      codigo: 'SUC-001',
      es_sucursal_principal: true,
      pais: 'Honduras',
      ciudad: 'Tegucigalpa',
      direccion: 'Bulevar Morazán',
      telefono: '+504 2233-4456',
      estado: true,
    },
  });

  // 4. Crear Licencia
  await prisma.licencia.upsert({
    where: { llave: 'LIC-KEY-12345-ABCDE' },
    update: {},
    create: {
      id_sucursal: sucursal.id_sucursal,
      inicio: new Date(),
      final: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      llave: 'LIC-KEY-12345-ABCDE',
      tipo_licencia: 'ENTERPRISE',
      cantidad_usuarios: 50,
      cantidad_areas: 10,
      estado: true,
    },
  });

  // 5. Crear Áreas
  const areaAdmin = await prisma.area.upsert({
    where: { id_sucursal_codigo: { id_sucursal: sucursal.id_sucursal, codigo: 'AREA-ADMIN' } },
    update: {},
    create: {
      id_sucursal: sucursal.id_sucursal,
      nombre: 'Administración',
      codigo: 'AREA-ADMIN',
      tipo_area: 'ADMINISTRATIVA',
      es_area_operativa: false,
      estado: true,
    },
  });

  const areaRecepcion = await prisma.area.upsert({
    where: { id_sucursal_codigo: { id_sucursal: sucursal.id_sucursal, codigo: 'AREA-RECEP' } },
    update: {},
    create: {
      id_sucursal: sucursal.id_sucursal,
      nombre: 'Recepción y Portería',
      codigo: 'AREA-RECEP',
      tipo_area: 'OPERATIVA',
      modulo_principal: 'RECEPCION',
      es_area_operativa: true,
      estado: true,
    },
  });

  // 6. Roles
  const rolAdmin = await prisma.rol.upsert({
    where: { codigo: 'ADMIN' },
    update: {},
    create: { codigo: 'ADMIN', nombre: 'Administrador', descripcion: 'Rol de administrador del sistema', es_rol_sistema: true, prioridad: 1, estado: true },
  });

  const rolOperador = await prisma.rol.upsert({
    where: { codigo: 'OPERADOR' },
    update: {},
    create: { codigo: 'OPERADOR', nombre: 'Operador de Recepción', descripcion: 'Encargado de registrar entradas y salidas', es_rol_sistema: false, prioridad: 10, estado: true },
  });

  const rolBascula = await prisma.rol.upsert({
    where: { codigo: 'BASCULA' },
    update: {},
    create: { codigo: 'BASCULA', nombre: 'Operador de Bascula', descripcion: 'Personal encargado de operar la bascula', es_rol_sistema: false, prioridad: 100, estado: true },
  });

  const rolMuestreo = await prisma.rol.upsert({
    where: { codigo: 'MUESTREO' },
    update: {},
    create: { codigo: 'MUESTREO', nombre: 'Operador de Muestreo', descripcion: 'Personal encargado de muestrear', es_rol_sistema: false, prioridad: 100, estado: true },
  });

  const rolLaboratorio = await prisma.rol.upsert({
    where: { codigo: 'LABORATORIO' },
    update: {},
    create: { codigo: 'LABORATORIO', nombre: 'Operador de laboratorio', descripcion: 'Personal encargado de ingresar analisis de muestra', es_rol_sistema: false, prioridad: 100, estado: true },
  });

  const rolGerencia = await prisma.rol.upsert({
    where: { codigo: 'GERENCIA' },
    update: {},
    create: { codigo: 'GERENCIA', nombre: 'Aprobaciones', descripcion: 'Personal encargado de aprobar', es_rol_sistema: false, prioridad: 100, estado: true },
  });

  const rolComercial = await prisma.rol.upsert({
    where: { codigo: 'COMERCIAL' },
    update: {},
    create: { codigo: 'COMERCIAL', nombre: 'Modulo Comercial', descripcion: 'Personal de contratos e inventarios', es_rol_sistema: false, prioridad: 100, estado: true },
  });

  const rolIndustrial = await prisma.rol.upsert({
    where: { codigo: 'INDUSTRIAL' },
    update: {},
    create: { codigo: 'INDUSTRIAL', nombre: 'Modulo Industrial', descripcion: 'Personal de trilla y producción', es_rol_sistema: false, prioridad: 100, estado: true },
  });

  const rolDespacho = await prisma.rol.upsert({
    where: { codigo: 'DESPACHO' },
    update: {},
    create: { codigo: 'DESPACHO', nombre: 'Modulo Despacho', descripcion: 'Personal de embarque y exportación', es_rol_sistema: false, prioridad: 100, estado: true },
  });

  const rolVentas = await prisma.rol.upsert({
    where: { codigo: 'VENTAS' },
    update: {},
    create: { codigo: 'VENTAS', nombre: 'Modulo Ventas Locales', descripcion: 'Personal de ventas locales', es_rol_sistema: false, prioridad: 100, estado: true },
  });

  // 7. Permisos (Según Tabla_Permisos.txt y requerimientos de front-end)
  const permisosData = [
    { codigo: 'VER_USUARIOS', modulo: 'Administrador', accion: 'Ver Usuarios', descripcion: 'Permite ver la lista de usuarios' },
    { codigo: 'VER_RECEPCION', modulo: 'Recepcion', accion: 'Ver Recepciones', descripcion: 'Permiso para poder visualizar las recepciones' },
    { codigo: 'VER_BASCULA', modulo: 'Bascula', accion: 'Ver Bascula', descripcion: 'Permiso para poder visualizar la bascula' },
    { codigo: 'VER_MUESTREO', modulo: 'Muestreo', accion: 'Ver Muestreos', descripcion: 'Permite ver la lista de Muestreo' },
    { codigo: 'VER_ACCIONES_MUESTREO', modulo: 'Muestreo', accion: 'Acciones', descripcion: 'Permite muestrear el vehiculo' },
    { codigo: 'VER_ACCIONES_RECEPCION', modulo: 'Recepcion', accion: 'Acciones', descripcion: 'Permite ver las acciones del modulo' },
    { codigo: 'EDITAR_RECEPCION', modulo: 'Recepcion', accion: 'Editar', descripcion: 'Permite editar recepcion' },
    { codigo: 'IMPRIMIR_RECEPCION', modulo: 'Recepcion', accion: 'Imprimir', descripcion: 'Permite imprimir recepcion' },
    { codigo: 'ANULAR_RECEPCION', modulo: 'Recepcion', accion: 'Anular', descripcion: 'Permite anular recepcion' },
    { codigo: 'CREAR_RECEPCION', modulo: 'Recepcion', accion: 'Crear', descripcion: 'Permite crear recepcion' },
    { codigo: 'VER_MUESTRA', modulo: 'Laboratorio', accion: 'Ver Laboratorio', descripcion: '' },
    { codigo: 'VER_ACCION_MUESTRA', modulo: 'Laboratorio', accion: 'Acciones', descripcion: '' },
    { codigo: 'VER_APROBACIONES', modulo: 'Gerencia', accion: 'Ver Aprobaciones', descripcion: '' },
    { codigo: 'APROBAR_MUESTRA', modulo: 'Gerencia', accion: 'Aprobar', descripcion: '' },
    { codigo: 'VER_ROLES', modulo: 'Administrador', accion: 'Ver Roles', descripcion: 'Permite ver la lista de roles' },
    { codigo: 'VER_CONFIGURACION', modulo: 'Administrador', accion: 'Ver Configuraciones', descripcion: 'Permite ver la lista de configuaciones' },
    { codigo: 'VER_CATALOGOS', modulo: 'Administrador', accion: 'Ver Catalogos', descripcion: 'Permite ver la lista de catalogos' },
    { codigo: 'IMPRIMIR_MUESTRA', modulo: 'Laboratorio', accion: 'Imprimir Muestra', descripcion: '' },
    { codigo: 'CREAR_MUESTRA', modulo: 'Laboratorio', accion: 'Crear Analisis', descripcion: '' },
    { codigo: 'PESAR_EQUIPO', modulo: 'Bascula', accion: 'Pesar', descripcion: '' },
    { codigo: 'CAMBIO_DE_CABEZAL', modulo: 'Bascula', accion: 'Cambio de cabezal', descripcion: '' },
    { codigo: 'VER_WMS_PATIO', modulo: 'Nota de Patio', accion: 'Ver Nota de Patio', descripcion: '' },
    { codigo: 'VER_NOTA_PESO', modulo: 'Nota de Peso', accion: 'Ver Nota de Peso', descripcion: '' },
    { codigo: 'VER_CONTRATOS', modulo: 'Comercial', accion: 'Ver Contratos', descripcion: '' },
    { codigo: 'VER_MUESTRA_PREEMBARQUE', modulo: 'Comercial', accion: 'Ver Muestra Preembarque', descripcion: '' },
    { codigo: 'VER_LAB_PREEMBARQUE', modulo: 'Comercial', accion: 'Ver Lab Preembarque', descripcion: '' },
    { codigo: 'VER_APROBACIONES_CLIENTE', modulo: 'Comercial', accion: 'Ver Aprobaciones Cliente', descripcion: '' },
    { codigo: 'VER_LOTES', modulo: 'Comercial', accion: 'Ver Lotes', descripcion: '' },
    { codigo: 'VER_SI', modulo: 'Comercial', accion: 'Ver Instrucciones Embarque', descripcion: '' },
    { codigo: 'VER_INVENTARIO', modulo: 'Comercial', accion: 'Ver Inventario Pergamino', descripcion: '' },
    { codigo: 'VER_PROGRAMA', modulo: 'Industrial', accion: 'Ver Programa', descripcion: '' },
    { codigo: 'VER_ORDEN_SACOS', modulo: 'Industrial', accion: 'Ver Orden Sacos', descripcion: '' },
    { codigo: 'VER_TRILLA', modulo: 'Industrial', accion: 'Ver Trilla', descripcion: '' },
    { codigo: 'VER_BALANCE_MASAS', modulo: 'Industrial', accion: 'Ver Balance Masas', descripcion: '' },
    { codigo: 'VER_PRODUCTO_TERMINADO', modulo: 'Industrial', accion: 'Ver Producto Terminado', descripcion: '' },
    { codigo: 'VER_REMANENTE', modulo: 'Industrial', accion: 'Ver Merma / Remanente', descripcion: '' },
    { codigo: 'VER_CONTENEDORES', modulo: 'Despacho', accion: 'Ver Contenedores', descripcion: '' },
    { codigo: 'VER_ORDEN_CARGA', modulo: 'Despacho', accion: 'Ver Orden Carga', descripcion: '' },
    { codigo: 'VER_CARGA', modulo: 'Despacho', accion: 'Ver Carga', descripcion: '' },
    { codigo: 'VER_BASCULA_SALIDA', modulo: 'Despacho', accion: 'Ver Bascula Salida', descripcion: '' },
    { codigo: 'VER_DOCUMENTOS', modulo: 'Despacho', accion: 'Ver Documentacion', descripcion: '' },
    { codigo: 'VER_KARDEX', modulo: 'Ventas Locales', accion: 'Ver Kardex', descripcion: '' },
    { codigo: 'VER_ORDEN_VENTA', modulo: 'Ventas Locales', accion: 'Ver Orden Venta', descripcion: '' },
    { codigo: 'VER_BASCULA_VENTA', modulo: 'Ventas Locales', accion: 'Ver Bascula Venta', descripcion: '' },
    { codigo: 'VER_SALIDA', modulo: 'Ventas Locales', accion: 'Ver Salida', descripcion: '' }
  ];

  const permisosMap: Record<string, any> = {};
  for (const p of permisosData) {
    permisosMap[p.codigo] = await prisma.permiso.upsert({
      where: { codigo: p.codigo },
      update: {},
      create: p,
    });
  }

  // 8. RolPermiso (Asignar permisos a roles)
  const assignPermissions = async (rolId: number, permisosCodigos: string[]) => {
    for (const code of permisosCodigos) {
      const permiso = permisosMap[code];
      if (permiso) {
        await prisma.rolPermiso.upsert({
          where: { id_rol_id_permiso: { id_rol: rolId, id_permiso: permiso.id_permiso } },
          update: {},
          create: { id_rol: rolId, id_permiso: permiso.id_permiso },
        });
      }
    }
  };

  await assignPermissions(rolAdmin.id_rol, permisosData.map(p => p.codigo));
  await assignPermissions(rolOperador.id_rol, ['VER_RECEPCION', 'VER_ACCIONES_RECEPCION', 'EDITAR_RECEPCION', 'IMPRIMIR_RECEPCION', 'ANULAR_RECEPCION', 'CREAR_RECEPCION']);
  await assignPermissions(rolBascula.id_rol, ['VER_BASCULA', 'PESAR_EQUIPO', 'CAMBIO_DE_CABEZAL']);
  await assignPermissions(rolMuestreo.id_rol, ['VER_MUESTREO', 'VER_ACCIONES_MUESTREO']);
  await assignPermissions(rolLaboratorio.id_rol, ['VER_MUESTRA', 'VER_ACCION_MUESTRA', 'IMPRIMIR_MUESTRA', 'CREAR_MUESTRA']);
  await assignPermissions(rolGerencia.id_rol, ['VER_APROBACIONES', 'APROBAR_MUESTRA']);

  // 9. Usuarios (y UsuarioRol implícito)
  const adminUser = await prisma.usuario.upsert({
    where: { usuario: 'admin' },
    update: {},
    create: {
      usuario: 'admin',
      clave_hash: hashedPassword,
      nombre_visible: 'Administrador del Sistema',
      correo: 'admin@globalcafe.hn',
      es_administrador: true,
      activo: true,
      roles: {
        create: { rol: { connect: { id_rol: rolAdmin.id_rol } } },
      },
    },
  });

  const operadorUser = await prisma.usuario.upsert({
    where: { usuario: 'recepcion' },
    update: {},
    create: {
      usuario: 'recepcion',
      clave_hash: hashedPassword,
      nombre_visible: 'Juan Pérez (Recepción)',
      correo: 'recepcion@globalcafe.hn',
      es_administrador: false,
      activo: true,
      roles: {
        create: { rol: { connect: { id_rol: rolOperador.id_rol } } },
      },
    },
  });

  const basculaUser = await prisma.usuario.upsert({
    where: { usuario: 'bascula' },
    update: {},
    create: {
      usuario: 'bascula',
      clave_hash: hashedPassword,
      nombre_visible: 'Operador de Báscula',
      correo: 'bascula@globalcafe.hn',
      es_administrador: false,
      activo: true,
      roles: {
        create: { rol: { connect: { id_rol: rolBascula.id_rol } } },
      },
    },
  });

  const laboratorioUser = await prisma.usuario.upsert({
    where: { usuario: 'laboratorio' },
    update: {},
    create: {
      usuario: 'laboratorio',
      clave_hash: hashedPassword,
      nombre_visible: 'Analista de Laboratorio',
      correo: 'laboratorio@globalcafe.hn',
      es_administrador: false,
      activo: true,
      roles: {
        create: { rol: { connect: { id_rol: rolLaboratorio.id_rol } } },
      },
    },
  });

  // 10. Empleados
  await prisma.empleado.upsert({
    where: { codigo_empleado: 'EMP-001' },
    update: {},
    create: {
      id_area: areaAdmin.id_area,
      id_usuario: adminUser.id,
      nombre_completo: 'Administrador del Sistema',
      codigo_empleado: 'EMP-001',
      puesto: 'Gerente de TI',
      estado_laboral: 'ACTIVO',
    },
  });

  // 11. UsuarioArea
  await prisma.usuarioArea.upsert({
    where: { usuario_id_id_area: { usuario_id: adminUser.id, id_area: areaAdmin.id_area } },
    update: {},
    create: {
      usuario_id: adminUser.id,
      id_area: areaAdmin.id_area,
      es_area_principal: true,
      activo: true,
    },
  });

  // 12. LogSistema (Ejemplo inicial)
  await prisma.logSistema.create({
    data: {
      usuario_id: adminUser.id,
      usuario_login: adminUser.usuario,
      nombre_usuario: adminUser.nombre_visible,
      id_accion: 1,
      accion_nombre: 'SEED_DATABASE',
      modulo: 'SISTEMA',
      exito: true,
      fecha_evento: new Date(),
      origen: 'SEED',
    },
  });

  console.log('Seed base completado. Iniciando Seed de Catálogos Operativos...');

  // Reutilizamos el ID del usuario admin creado en el paso 9
  const idUsuario = adminUser.id;

  // 13. Estados de Transacción (Vital para el flujo)
  const estados = [
    'Pendiente de Muestrear', 'Muestra Previa Recibida', 'Muestra Previa Ingresada',
    'Muestra Previa Pendiente de Aprobacion', 'Muestra Aprobada', 'Muestra Rechazada',
    'Pesada Abierta', 'Pesada Cerrada', 'Sin Cabezal', 'Muestra General Recibida',
    'Muestra General Ingresada', 'Muestra General Pendiente de Aprobacion', 
    'Muestra General Aprobada', 'Descuento Por Calidad', 'Descuento Por Peso', 
    'Descuento Por Daño', 'Descuento Por Humedad', 'Pendiente de Aprobación por Faltos'
  ];

  for (const nombre of estados) {
    await prisma.estadoTransaccion.upsert({
      where: { nombre },
      update: {},
      create: { nombre, usuario_creacion: idUsuario }
    });
  }
  console.log('✅ Estados de Transacción insertados.');

  // 14. Cosechas
  await prisma.cosecha.upsert({
    where: { cosecha: '2023-2024' }, update: {}, create: { cosecha: '2023-2024', cosecha_actual: false, usuario_creacion: idUsuario }
  });
  await prisma.cosecha.upsert({
    where: { cosecha: '2024-2025' }, update: { cosecha_actual: true }, create: { cosecha: '2024-2025', cosecha_actual: true, usuario_creacion: idUsuario }
  });
  console.log('✅ Cosechas insertadas.');

  // Solo insertamos datos operativos de prueba si la base está limpia de Departamentos
  const deptosCount = await prisma.departamento.count();
  if (deptosCount === 0) {
    // 15. Departamentos y Municipios
    const deptoParaiso = await prisma.departamento.create({ data: { nombre: 'El Paraíso', usuario_creacion: idUsuario } });
    const muniDanli = await prisma.municipio.create({ data: { nombre: 'Danlí', id_departamento: deptoParaiso.id_departamento, usuario_creacion: idUsuario } });

    const deptoComayagua = await prisma.departamento.create({ data: { nombre: 'Comayagua', usuario_creacion: idUsuario } });
    const muniComayagua = await prisma.municipio.create({ data: { nombre: 'Comayagua', id_departamento: deptoComayagua.id_departamento, usuario_creacion: idUsuario } });
    console.log('✅ Departamentos y Municipios insertados.');

    // 16. Proveedores
    await prisma.proveedor.create({ data: { nombre: 'Productor Juan Pérez', rtn: '07031980123454', id_municipio: muniDanli.id_municipio, telefono: '9999-9999', usuario_creacion: idUsuario } });
    await prisma.proveedor.create({ data: { nombre: 'Finca El Puente', rtn: '03011990111111', id_municipio: muniComayagua.id_municipio, telefono: '8888-8888', usuario_creacion: idUsuario } });
    console.log('✅ Proveedores insertados.');

    // 17. Transporte y Conductores
    const transporte = await prisma.transporte.create({ data: { nombre: 'Transportes Rápidos S.A.', id_municipio: muniDanli.id_municipio, usuario_creacion: idUsuario } });
    await prisma.conductor.create({ data: { nombre: 'Carlos Martínez', licencia: '0703-1980-00123', id_transporte: transporte.id_transporte, id_municipio: muniDanli.id_municipio, usuario_creacion: idUsuario } });
    console.log('✅ Transporte y Conductores insertados.');

    // 18. Bodegas y Estibas
    const bodegaIn = await prisma.bodega.create({ data: { nombre: 'Bodega Principal A', externa: false, usuario_creacion: idUsuario } });
    await prisma.estiba.create({ data: { nombre: 'Estiba A-1', id_bodega: bodegaIn.id_bodega, usuario_creacion: idUsuario } });
    await prisma.estiba.create({ data: { nombre: 'Estiba A-2', id_bodega: bodegaIn.id_bodega, usuario_creacion: idUsuario } });
    console.log('✅ Bodegas y Estibas insertadas.');

    // 19. Laboratorio (Catadores, Calidad, etc)
    await prisma.catador.create({ data: { nombre: 'Ana López (Catador Q)', usuario_creacion: idUsuario } });
    await prisma.calidad.create({ data: { nombre: 'Estrictamente Altura (SHG)', usuario_creacion: idUsuario } });
    await prisma.defecto.create({ data: { nombre: 'Grano Negro', usuario_creacion: idUsuario } });
    await prisma.defecto.create({ data: { nombre: 'Brocado Severo', usuario_creacion: idUsuario } });
    await prisma.zaranda.create({ data: { nombre: 'Zaranda 15', usuario_creacion: idUsuario } });
    await prisma.taza.create({ data: { nombre: 'Taza Limpia', usuario_creacion: idUsuario } });
    console.log('✅ Catálogos de Laboratorio insertados.');
  }

  // 20. Placas (Tienen constraint Unique)
  await prisma.placaCabezal.upsert({ where: { placa: 'HAA-1234' }, update: {}, create: { placa: 'HAA-1234', usuario_creacion: idUsuario } });
  await prisma.placaFurgon.upsert({ where: { placa: 'TC-9999' }, update: {}, create: { placa: 'TC-9999', usuario_creacion: idUsuario } });
  console.log('✅ Placas insertadas.');

  console.log('🎉 Todo el Seed completado exitosamente.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
