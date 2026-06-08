import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { CreateReceptionDto } from './dto/create-reception.dto';
import { UpdateReceptionDto } from './dto/update-reception.dto';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class ReceptionService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsGateway
  ) {}

  // 1. CREAR (Incluye Usuario ID del Guardián)
  async create(dto: CreateReceptionDto, usuarioId: number) {
    // 1. Buscar el ID del Estado Inicial de forma automática
    const estadoInicial = await this.prisma.estadoTransaccion.findUnique({
      where: { nombre: 'Pendiente de Muestrear' }
    });
    if (!estadoInicial) {
      throw new InternalServerErrorException('El estado inicial "Pendiente de Muestrear" no existe en el catálogo.');
    }

    const count = await this.prisma.recepcion.count();
    const correlativo = `REC-${String(count + 1).padStart(5, '0')}`;

    const nuevaRecepcion = await this.prisma.recepcion.create({
      data: {
        numero_entrada: correlativo,
        id_sucursal: dto.id_sucursal || 1, // TODO: Dinámico según el usuario
        id_cosecha: dto.id_cosecha,
        tipo_vehiculo: dto.tipo_vehiculo,
        id_placa_cabezal: dto.id_placa_cabezal,
        id_placa_furgon: dto.id_placa_furgon,
        id_conductor: dto.id_conductor,
        id_municipio: dto.id_municipio,
        marchamo: dto.marchamo,
        observaciones: dto.observaciones,
        estado: true,
        // Relación con Usuario
        usuario_creacion: usuarioId,
        // Relación con Detalles (Equivalente al cascade: true)
        detalles: {
          create: dto.detalles?.map(det => ({
            id_proveedor: det.id_proveedor,
            id_estado_transaccion: estadoInicial.id_estado_transaccion, // Asignado por el sistema
            cantidad_sacos: det.cantidad_sacos,
            cantidad_qq: det.cantidad_qq,
            remision: det.remision,
            observaciones: det.observaciones,
            usuario_creacion: usuarioId,
          })),
        },
      },
      include: { detalles: true },
    });

    this.notifications.emitNotification('new_notification', {
      title: 'Nuevo Vehículo en Portería',
      message: `Se registró el ingreso ${correlativo} del transporte ${dto.tipo_vehiculo}.`,
      type: 'info',
      module: 'RECEPCION'
    });

    return nuevaRecepcion;
  }

  // 2. LEER TODOS
  findAll() {
    return this.prisma.recepcion.findMany({
      where: { estado: true },
      include: { 
        detalles: {
          include: { estado_transaccion: true }
        } 
      },
      orderBy: { id_recepcion: 'desc' },
    });
  }

  // 3. LEER UNO
  async findOne(id: number) {
    const recepcion = await this.prisma.recepcion.findUnique({
      where: { id_recepcion: id },
      include: { 
        detalles: {
          include: { estado_transaccion: true }
        } 
      },
    });
    if (!recepcion) throw new NotFoundException(`Recepción #${id} no encontrada`);
    return recepcion;
  }

  // 4. RESUMEN DEL DASHBOARD (Enfocado 100% en Módulo 1: Recepción)
  async getResumenHoy() {
    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    
    const finDia = new Date();
    finDia.setHours(23, 59, 59, 999);

    // A. MÉTRICAS (Stats)
    const totalCamiones = await this.prisma.recepcion.count({
      where: {
        fecha_entrada: { gte: inicioDia, lte: finDia },
        estado: true,
      },
    });

    const agregados = await this.prisma.detalleRecepcion.aggregate({
      where: {
        recepcion: {
          fecha_entrada: { gte: inicioDia, lte: finDia },
          estado: true,
        },
        estado: true,
      },
      _sum: {
        cantidad_sacos: true,
        cantidad_qq: true,
      },
    });

    const enProceso = await this.prisma.recepcion.count({
      where: {
        estado: true,
        detalles: {
          some: {
            estado: true,
            estado_transaccion: {
              nombre: { notIn: ['Pesada Cerrada', 'Pesada Abierta', 'Muestra Rechazada', 'Devolucion'] }
              }
              }
              },
      }
    });

    // B. TAREAS PENDIENTES (To-Do List por área)
    const tareasMuestreo = await this.prisma.detalleRecepcion.count({ where: { estado: true, estado_transaccion: { nombre: 'Pendiente de Muestrear' } } });
    const tareasLab = await this.prisma.detalleRecepcion.count({ where: { estado: true, estado_transaccion: { nombre: 'Muestreado' } } });
    const tareasGerencia = await this.prisma.detalleRecepcion.count({ where: { estado: true, estado_transaccion: { nombre: 'Muestra Previa Pendiente de Aprobacion' } } });
    const tareasBascula = await this.prisma.recepcion.count({ 
      where: { 
        estado: true, 
        detalles: { 
          some: { 
            estado: true, 
            estado_transaccion: { nombre: { in: ['Muestra Aprobada', 'Pesada Abierta', 'Sin Cabezal'] } } 
          } 
        } 
      } 
    });

    // C. ACTIVIDAD RECIENTE (Últimos 5 ingresos creados)
    const ultimosIngresos = await this.prisma.recepcion.findMany({
      where: { estado: true },
      orderBy: { fecha_entrada: 'desc' },
      take: 5,
      include: { 
        conductor: { include: { transporte: true } },
        detalles: { where: { estado: true } }
      }
    });

    return {
      stats: {
        ingresosHoy: totalCamiones,
        sacosHoy: agregados._sum.cantidad_sacos || 0,
        qqHoy: agregados._sum.cantidad_qq ? Number(agregados._sum.cantidad_qq) : 0,
        enProceso
      },
      pendientes: {
        muestreo: tareasMuestreo,
        laboratorio: tareasLab,
        gerencia: tareasGerencia,
        bascula: tareasBascula
      },
      actividad: ultimosIngresos.map(r => ({
        id: r.id_recepcion,
        numero_entrada: r.numero_entrada,
        transporte: r.conductor?.transporte?.nombre || 'Desconocido',
        fecha: r.fecha_entrada,
        sacos: r.detalles.reduce((sum, d) => sum + d.cantidad_sacos, 0),
        qq: r.detalles.reduce((sum, d) => sum + Number(d.cantidad_qq), 0)
      }))
    };
  }

  // 5. ELIMINAR (Baja Lógica)
  async remove(id: number, usuarioId: number) {
    await this.findOne(id); // Valida que exista
    return this.prisma.recepcion.update({
      where: { id_recepcion: id },
      data: {
        estado: false,
        usuario_modificacion: usuarioId,
        fecha_modificacion: new Date(),
        detalles: {
          updateMany: {
            where: { estado: true }, // Al estar anidado, Prisma ya filtra por id_recepcion automáticamente
            data: { estado: false, usuario_modificacion: usuarioId, fecha_modificacion: new Date() },
          },
        },
      },
    });
  }

  // 5.5 REGISTRAR IMPRESIÓN
  async registrarImpresion(id: number) {
    const recepcion = await this.findOne(id);
    return this.prisma.recepcion.update({
      where: { id_recepcion: id },
      data: { cantidad_impresiones: (recepcion.cantidad_impresiones || 0) + 1 },
    });
  }

  // 5.6 CAMBIAR ESTADO DE UN DETALLE (Para flujo de trabajo: Muestreo, Laboratorio, etc.)
  async cambiarEstadoDetalle(idDetalle: number, nombreEstado: string, usuarioId: number) {
    const estado = await this.prisma.estadoTransaccion.findUnique({
      where: { nombre: nombreEstado }
    });
    if (!estado) throw new NotFoundException(`El estado '${nombreEstado}' no existe en el catálogo`);

    const detalleActualizado = await this.prisma.detalleRecepcion.update({
      where: { id_detalle_recepcion: idDetalle },
      data: { 
        id_estado_transaccion: estado.id_estado_transaccion,
        usuario_modificacion: usuarioId,
        fecha_modificacion: new Date()
      },
      include: { recepcion: true }
    });

    if (nombreEstado === 'Muestreado') {
      this.notifications.emitNotification('new_notification', {
        title: 'Muestra Física Tomada',
        message: `El viaje ${detalleActualizado.recepcion.numero_entrada} ya fue muestreado en patio y pasó a Laboratorio.`,
        type: 'info',
        module: 'RECEPCION'
      });
    }

    return detalleActualizado;
  }

  // 6. ACTUALIZAR (Lógica Maestro-Detalle)
  async update(id: number, dto: UpdateReceptionDto, usuarioId: number) {
    const { detalles, ...datosEncabezado } = dto;
    await this.findOne(id);

    // Si hay detalles nuevos que se están agregando en la edición, necesitamos el estado inicial
    let idEstadoInicial = 0;
    if (detalles && detalles.some(d => !d.id_detalle_recepcion)) {
      const estadoInicial = await this.prisma.estadoTransaccion.findUnique({
        where: { nombre: 'Pendiente de Muestrear' }
      });
      if (!estadoInicial) throw new InternalServerErrorException('El estado inicial no existe.');
      idEstadoInicial = estadoInicial.id_estado_transaccion;
    }

    return this.prisma.$transaction(async (tx) => {
      // Actualizar encabezado
      const actualizada = await tx.recepcion.update({
        where: { id_recepcion: id },
        data: {
          ...datosEncabezado,
          usuario_modificacion: usuarioId,
          fecha_modificacion: new Date(),
        },
      });

      if (detalles) {
        // Marcamos como inactivos los que no vienen en el nuevo array (Soft delete)
        const idsEntrantes: number[] = detalles
          .filter(d => d.id_detalle_recepcion !== undefined && d.id_detalle_recepcion !== null) // Filtro de seguridad
          .map(d => d.id_detalle_recepcion as number);
          
        await tx.detalleRecepcion.updateMany({
          where: {
            id_recepcion: id,
            id_detalle_recepcion: { notIn: idsEntrantes },
          },
          data: { estado: false, usuario_modificacion: usuarioId, fecha_modificacion: new Date() },
        });

        // Procesar detalles nuevos o existentes
        for (const det of detalles) {
          const { id_detalle_recepcion, ...datosDetalle } = det; // Extraemos el ID para no intentar actualizar la llave primaria
          if (id_detalle_recepcion) {
            await tx.detalleRecepcion.update({
              where: { id_detalle_recepcion },
              data: { 
                ...datosDetalle, 
                estado: true,
                usuario_modificacion: usuarioId,
                fecha_modificacion: new Date()
              },
            });
          } else {
            await tx.detalleRecepcion.create({
              data: { 
                ...datosDetalle, 
                  id_estado_transaccion: idEstadoInicial, // Asignamos el estado inicial automático
                id_recepcion: id,
                usuario_creacion: usuarioId
              },
            });
          }
        }
      }
      return actualizada;
    });
  }

  // ==========================================
  // MÓDULO BÁSCULA DE ENTRADA
  // ==========================================

  // Obtiene los viajes completos que tienen al menos una carga lista para pesarse
  async getPendientesBascula() {
    return this.prisma.recepcion.findMany({
      where: {
        estado: true,
        detalles: {
          some: {
            estado: true,
            estado_transaccion: {
              nombre: {
                in: [
                  'Muestra Aprobada', 
                  'Pesada Abierta', 
                  'Sin Cabezal', 
                  'Muestra General Recibida', 
                  'Pendiente de Aprobación por Faltos',
                  'Muestra General Pendiente de Aprobacion'
                ]
              }
            }
          }
        }
      },
      include: {
        placa_cabezal: true,
        placa_furgon: true,
        conductor: { include: { transporte: true } },
        detalles: {
          where: {
            estado: true,
          },
          include: { 
            proveedor: true, 
            estado_transaccion: true,
            notas_patio: true, // Incluimos para validar en el front
            cambios_cabezal: { where: { estado: true } }
          },
          orderBy: { id_detalle_recepcion: 'asc' }
        }
      },
      orderBy: { id_recepcion: 'asc' }
    });
  }

  // Registra el peso del camión LLENO
  async registrarPesadaEntrada(idDetalle: number, peso: number, idBodega: number, usuarioId: number) {
    const estadoEnPesaje = await this.prisma.estadoTransaccion.findUnique({
      where: { nombre: 'Pesada Abierta' }
    });
    if (!estadoEnPesaje) throw new InternalServerErrorException('El estado "Pesada Abierta" no existe en BD');

    // 1. Validar que no haya otra carga del mismo viaje actualmente en báscula
    const detalleActual = await this.prisma.detalleRecepcion.findUnique({
      where: { id_detalle_recepcion: idDetalle },
      include: { recepcion: { include: { detalles: { include: { estado_transaccion: true } } } } }
    });

    if (detalleActual) {
      // 1. Validar que no haya otra carga del mismo viaje actualmente en báscula
      const cargaEnPesaje = detalleActual.recepcion.detalles.find(d => 
        d.id_detalle_recepcion !== idDetalle && 
        d.estado && 
        ['Pesada Abierta', 'Sin Cabezal'].includes(d.estado_transaccion?.nombre || '')
      );

      if (cargaEnPesaje) {
        throw new InternalServerErrorException(`Operación denegada. El equipo tiene la remisión ${cargaEnPesaje.remision} en proceso de pesaje. Debe cerrar esa pesada antes de iniciar otra.`);
      }

      // 2. Validar si es un registro de faltos y si la carga principal ya cerró (Punto 3 del requerimiento)
      if (detalleActual.remision.endsWith('-F')) {
        const remisionOriginal = detalleActual.remision.replace('-F', '');
        const originalCerrado = detalleActual.recepcion.detalles.find(d => 
          d.remision === remisionOriginal && 
          d.estado_transaccion &&
          d.estado_transaccion.nombre === 'Pesada Cerrada'
        );

        if (!originalCerrado) {
          throw new InternalServerErrorException(`No se puede iniciar el pesaje de los sacos faltos (${detalleActual.remision}) hasta que la carga principal (${remisionOriginal}) haya cerrado su pesada.`);
        }
      }

      // 3. Validar si es un registro bloqueado por aprobación de faltos
      if (detalleActual.recepcion.detalles.find(d => d.estado && d.estado_transaccion?.nombre === 'Pendiente de Aprobación por Faltos')) {
        throw new InternalServerErrorException('Este registro de sacos faltos requiere aprobación de Gerencia antes de ser pesado.');
      }
    }

    const detalle = await this.prisma.detalleRecepcion.update({
      where: { id_detalle_recepcion: idDetalle },
      data: {
        pesada_entrada: peso,
        id_bodega_descargada: idBodega,
        fecha_entrada_bascula: new Date(),
        id_estado_transaccion: estadoEnPesaje.id_estado_transaccion,
        usuario_modificacion: usuarioId,
        fecha_modificacion: new Date()
      },
      include: { recepcion: true }
    });

    this.notifications.emitNotification('new_notification', {
      title: 'Báscula: Peso Bruto Registrado',
      message: `El vehículo del ingreso ${detalle.recepcion.numero_entrada} registró pesada de entrada (${peso.toLocaleString()} LB).`,
      type: 'success',
      module: 'RECEPCION'
    });

    return detalle;
  }

  // ==========================================
  // LÓGICA DE CAMBIO DE CABEZAL (DESTARSE)
  // ==========================================
  
  // Paso 1: Sale un cabezal dejando el furgón
  async registrarSalidaCabezal(idDetalle: number, idPlacaSaliente: number, pesoSaliente: number, usuarioId: number) {
    const estadoSinCabezal = await this.prisma.estadoTransaccion.findUnique({
      where: { nombre: 'Sin Cabezal' }
    });
    if (!estadoSinCabezal) throw new InternalServerErrorException('El estado "Sin Cabezal" no existe en BD');

    const detalleInfo = await this.prisma.detalleRecepcion.findUnique({
      where: { id_detalle_recepcion: idDetalle },
      include: { recepcion: true }
    });

    const resultado = await this.prisma.$transaction(async (tx) => {
      // 1. Cambiar estado de la carga a "Sin Cabezal"
      await tx.detalleRecepcion.update({
        where: { id_detalle_recepcion: idDetalle },
        data: {
          id_estado_transaccion: estadoSinCabezal.id_estado_transaccion,
          usuario_modificacion: usuarioId,
          fecha_modificacion: new Date()
        }
      });

      // 2. Registrar la salida en CambioCabezal dejando pendiente la entrada
      return tx.cambioCabezal.create({
        data: {
          id_detalle_recepcion: idDetalle,
          id_placa_cabezal_saliente: idPlacaSaliente,
          peso_cabezal_saliente: pesoSaliente,
          usuario_creacion: usuarioId
        }
      });
    });

    this.notifications.emitNotification('new_notification', {
      title: 'Báscula: Destarse Realizado',
      message: `El vehículo del ingreso ${detalleInfo?.recepcion.numero_entrada} quedó 'Sin Cabezal' en patio.`,
      type: 'warning',
      module: 'RECEPCION'
    });

    return resultado;
  }

  // Paso 2: Entra un nuevo cabezal (o el mismo) a recoger el furgón
  async registrarEntradaCabezal(idDetalle: number, idPlacaEntrante: number, pesoEntrante: number, usuarioId: number) {
    const estadoEnPesaje = await this.prisma.estadoTransaccion.findUnique({
      where: { nombre: 'Pesada Abierta' }
    });
    if (!estadoEnPesaje) throw new InternalServerErrorException('El estado "Pesada Abierta" no existe en BD');

    const resultado = await this.prisma.$transaction(async (tx) => {
      // 1. Buscar el registro de cambio pendiente
      const cambioPendiente = await tx.cambioCabezal.findFirst({
        where: { id_detalle_recepcion: idDetalle, id_placa_cabezal_entrante: null, estado: true }
      });
      if (!cambioPendiente) throw new InternalServerErrorException('No hay un destarse pendiente para esta carga');

      // 2. Obtener el peso base para calcular el nuevo Peso Bruto (puede ser la pesada de entrada original o un cambio de cabezal previo)
      const detalle = await tx.detalleRecepcion.findUnique({ where: { id_detalle_recepcion: idDetalle } });
      if (!detalle || !detalle.pesada_entrada) throw new InternalServerErrorException('Falta la pesada original de la carga');

      const ultimoCambioCompletado = await tx.cambioCabezal.findFirst({
        where: { id_detalle_recepcion: idDetalle, id_placa_cabezal_entrante: { not: null }, estado: true },
        orderBy: { id_cambio_cabezal: 'desc' }
      });

      const pesoBase = ultimoCambioCompletado && ultimoCambioCompletado.peso_bruto ? Number(ultimoCambioCompletado.peso_bruto) : Number(detalle.pesada_entrada);

      // 3. Fórmula: Nuevo Peso Bruto = Peso Base - Peso Cabezal que se fue + Peso Cabezal que entró
      const nuevoPesoBruto = pesoBase - Number(cambioPendiente.peso_cabezal_saliente) + pesoEntrante;

      // 4. Cerrar el ciclo en CambioCabezal
      await tx.cambioCabezal.update({
        where: { id_cambio_cabezal: cambioPendiente.id_cambio_cabezal },
        data: { id_placa_cabezal_entrante: idPlacaEntrante, peso_cabezal_entrante: pesoEntrante, peso_bruto: nuevoPesoBruto, usuario_modificacion: usuarioId, fecha_modificacion: new Date() }
      });

      // 5. Devolver la carga a 'Pesada Abierta' para que pueda pesarse la salida final
      return tx.detalleRecepcion.update({
        where: { id_detalle_recepcion: idDetalle },
        data: { id_estado_transaccion: estadoEnPesaje.id_estado_transaccion, usuario_modificacion: usuarioId, fecha_modificacion: new Date() },
        include: { recepcion: true }
      });
    });

    this.notifications.emitNotification('new_notification', {
      title: 'Báscula: Reenganche Realizado',
      message: `El vehículo del ingreso ${resultado.recepcion.numero_entrada} ha reenganchado un cabezal y espera Tara.`,
      type: 'info',
      module: 'RECEPCION'
    });

    return resultado;
  }

  // Registra la Tara final considerando si hubo o no cambio de cabezal
  async registrarPesadaSalida(idDetalle: number, peso: number, usuarioId: number) {
    const detalle = await this.prisma.detalleRecepcion.findUnique({ 
      where: { id_detalle_recepcion: idDetalle },
      include: {
        notas_patio: true, // Incluimos para validar
        cambios_cabezal: { where: { estado: true, id_placa_cabezal_entrante: { not: null } }, orderBy: { id_cambio_cabezal: 'desc' }, take: 1 }
      }
    });
    
    if (!detalle || !detalle.pesada_entrada) throw new InternalServerErrorException('Falta la pesada de entrada de este registro.');

    // VALIDACIÓN: No se puede pesar salida si no hay Nota de Patio (Punto 3 del requerimiento)
    if (!detalle.notas_patio || detalle.notas_patio.length === 0) {
      throw new InternalServerErrorException('Operación denegada. El equipo aún no tiene una Nota de Patio registrada (Descarga pendiente).');
    }
    
    // Si hay un cambio de cabezal completo, usamos SU peso bruto como real. De lo contrario, usamos la pesada de entrada original.
    const pesoBrutoReal = detalle.cambios_cabezal && detalle.cambios_cabezal.length > 0 
      ? Number(detalle.cambios_cabezal[0].peso_bruto) 
      : Number(detalle.pesada_entrada);

    if (peso >= pesoBrutoReal) throw new InternalServerErrorException('La tara (salida) no puede ser mayor o igual al peso bruto real.');

    const estadoCompletado = await this.prisma.estadoTransaccion.findUnique({ where: { nombre: 'Pesada Cerrada' } });
    if (!estadoCompletado) throw new InternalServerErrorException('El estado "Pesada Cerrada" no existe en BD.');

    const pesoNeto = pesoBrutoReal - peso;

    const detalleActualizado = await this.prisma.detalleRecepcion.update({
      where: { id_detalle_recepcion: idDetalle },
      data: { 
        pesada_salida: peso, fecha_salida_bascula: new Date(), peso_neto: pesoNeto, 
        id_estado_transaccion: estadoCompletado.id_estado_transaccion, usuario_modificacion: usuarioId, fecha_modificacion: new Date() 
      },
      include: { recepcion: true }
    });

    this.notifications.emitNotification('new_notification', {
      title: 'Báscula: Pesaje Completado',
      message: `El vehículo del ingreso ${detalleActualizado.recepcion.numero_entrada} ha cerrado su pesada. Peso Neto: ${pesoNeto.toLocaleString()} LB.`,
      type: 'success',
      module: 'RECEPCION'
    });

    return detalleActualizado;
  }

  // ==========================================
  // MÓDULO CONTROL DE PATIO (WMS)
  // ==========================================

  async getRecepcionesParaPatio() {
    return this.prisma.detalleRecepcion.findMany({
      where: {
        estado: true,
        pesada_entrada: { not: null },
        pesada_salida: null,
        notas_patio: { none: {} }
      },
      include: {
        recepcion: {
          include: {
            conductor: true,
            placa_cabezal: true
          }
        },
        proveedor: true,
        estado_transaccion: true
      },
      orderBy: { fecha_entrada_bascula: 'asc' }
    });
  }

  async crearNotaPatio(dto: any, usuarioId: number) {
    const { id_detalle_recepcion, id_estiba, cantidad_sacos_buenos, cantidad_sacos_faltos, observaciones_faltos } = dto;

    const detalleOriginal = await this.prisma.detalleRecepcion.findUnique({
      where: { id_detalle_recepcion },
      include: { recepcion: true }
    });

    if (!detalleOriginal) throw new NotFoundException('Detalle de recepción no encontrado');

    return this.prisma.$transaction(async (tx) => {
      // 1. Si hay faltos, creamos un nuevo detalle bloqueado
      if (cantidad_sacos_faltos > 0) {
        const estadoFaltos = await tx.estadoTransaccion.findUnique({
          where: { nombre: 'Pendiente de Aprobación por Faltos' }
        });
        if (!estadoFaltos) throw new InternalServerErrorException('Estado "Pendiente de Aprobación por Faltos" no encontrado');

        // El nuevo registro nace con los sacos faltos y la observación de por qué salieron faltos
        await tx.detalleRecepcion.create({
          data: {
            id_recepcion: detalleOriginal.id_recepcion,
            id_proveedor: detalleOriginal.id_proveedor,
            id_estado_transaccion: estadoFaltos.id_estado_transaccion,
            cantidad_sacos: cantidad_sacos_faltos,
            cantidad_qq: (Number(detalleOriginal.cantidad_qq) / detalleOriginal.cantidad_sacos) * cantidad_sacos_faltos,
            remision: `${detalleOriginal.remision}-F`,
            observaciones: `Sacos Faltos: ${observaciones_faltos}`,
            estado: true, // Lo dejamos activo pero el estado_transaccion lo bloquea de báscula
            usuario_creacion: usuarioId
          }
        });
      }

      // 2. Actualizamos el detalle original con los sacos que SÍ se bajaron (buenos)
      // Al crear nota de patio, el flujo indica que también debe notificarse a Laboratorio
      const estadoMuestreoGeneral = await tx.estadoTransaccion.findUnique({
        where: { nombre: 'Muestra General Recibida' }
      });

      await tx.detalleRecepcion.update({
        where: { id_detalle_recepcion },
        data: {
          cantidad_sacos: cantidad_sacos_buenos,
          // El peso se mantiene igual (es el peso bruto del equipo)
          id_estado_transaccion: estadoMuestreoGeneral?.id_estado_transaccion || detalleOriginal.id_estado_transaccion,
          usuario_modificacion: usuarioId,
          fecha_modificacion: new Date()
        }
      });

      // 3. Crear el registro maestro de la Nota de Patio
      const count = await tx.notaDePatio.count();
      const correlativo = `NP-${String(count + 1).padStart(5, '0')}`;

      const notaPatio = await tx.notaDePatio.create({
        data: {
          id_detalle_recepcion,
          numero_nota_patio: correlativo,
          usuario_creacion: usuarioId,
          detalles: {
            create: {
              id_estibas: id_estiba,
              cantidad_sacos: cantidad_sacos_buenos,
              usuario_creacion: usuarioId
            }
          }
        }
      });

      this.notifications.emitNotification('new_notification', {
        title: 'Patio: Nota Creada',
        message: `Se generó la nota ${correlativo} para el ingreso ${detalleOriginal.recepcion.numero_entrada}. Ya puede tomarse la muestra general.`,
        type: 'success',
        module: 'RECEPCION'
      });

      return notaPatio;
    });
  }

  async getPendientesAprobacionFaltos() {
    return this.prisma.detalleRecepcion.findMany({
      where: {
        estado: true,
        estado_transaccion: { nombre: 'Pendiente de Aprobación por Faltos' }
      },
      include: {
        recepcion: { include: { placa_cabezal: true, conductor: true } },
        proveedor: true,
        estado_transaccion: true
      },
      orderBy: { fecha_creacion: 'asc' }
    });
  }

  async decidirFaltos(idDetalle: number, dto: any, usuarioId: number) {
    const { decision, observaciones } = dto;
    const detalle = await this.prisma.detalleRecepcion.findUnique({
      where: { id_detalle_recepcion: idDetalle },
      include: { recepcion: true }
    });
    if (!detalle) throw new NotFoundException('Registro de faltos no encontrado');

    return this.prisma.$transaction(async (tx) => {
      if (decision === 'APROBAR') {
        const estadoAprobado = await tx.estadoTransaccion.findUnique({ where: { nombre: 'Muestra Aprobada' } });
        await tx.detalleRecepcion.update({
          where: { id_detalle_recepcion: idDetalle },
          data: {
            id_estado_transaccion: estadoAprobado?.id_estado_transaccion || detalle.id_estado_transaccion,
            observaciones: `${detalle.observaciones} | Aprobado por Gerencia: ${observaciones || 'Sin comentarios'}`,
            usuario_modificacion: usuarioId,
            fecha_modificacion: new Date()
          }
        });

        this.notifications.emitNotification('new_notification', {
          title: 'Gerencia: Faltos Aprobados',
          message: `Se aprobó la descarga de los sacos faltos del ingreso ${detalle.recepcion.numero_entrada}. Ya puede pesarse en báscula.`,
          type: 'success',
          module: 'RECEPCION'
        });
      } else {
        const estadoDevolucion = await tx.estadoTransaccion.findUnique({ where: { nombre: 'Devolucion' } });
        await tx.detalleRecepcion.update({
          where: { id_detalle_recepcion: idDetalle },
          data: {
            id_estado_transaccion: estadoDevolucion?.id_estado_transaccion || detalle.id_estado_transaccion,
            estado: false, // Se marca como inactivo porque se devuelve
            observaciones: `${detalle.observaciones} | DEVUELTO por Gerencia: ${observaciones || 'Sin comentarios'}`,
            usuario_modificacion: usuarioId,
            fecha_modificacion: new Date()
          }
        });

        this.notifications.emitNotification('new_notification', {
          title: 'Gerencia: Carga Devuelta',
          message: `Se ha ordenado la devolución de sacos faltos para el ingreso ${detalle.recepcion.numero_entrada}.`,
          type: 'danger',
          module: 'RECEPCION'
        });
      }
      return { success: true };
    });
  }
}