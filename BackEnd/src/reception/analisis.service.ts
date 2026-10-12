import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAnalisisDto, VeredictoGerenciaDto } from './dto/create-analisis.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AnalisisService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService
  ) {}

  // 1. GUARDAR ANÁLISIS (Desde pantalla de Laboratorio)
  async createAnalisis(dto: CreateAnalisisDto, usuarioId: number) {
    console.log('[createAnalisis] Payload recibido:', JSON.stringify(dto, null, 2));
    
    // Seleccionar el estado de destino según el tipo de análisis (Punto 4 del requerimiento)
    const nombreEstadoDestino = dto.tipo_analisis === 'Muestra General' 
      ? 'Muestra General Pendiente de Aprobacion' 
      : 'Muestra Previa Pendiente de Aprobacion';

    const estadoDestino = await this.prisma.estadoTransaccion.findUnique({
      where: { nombre: nombreEstadoDestino }
    });

    if (!estadoDestino) {
      throw new InternalServerErrorException(`El estado "${nombreEstadoDestino}" no existe en BD`);
    }

    // Generar correlativo (Ej: AN-2024-0001)
    const count = await this.prisma.analisisCalidad.count();
    const correlativo = `AN-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`;

    let resultado: any;
    try {
    resultado = await this.prisma.$transaction(async (tx) => {
      // A. Guardamos el resultado del laboratorio
      const analisis = await tx.analisisCalidad.create({
        data: {
          id_detalle_recepcion: dto.id_detalle_recepcion,
          id_estado_transaccion: estadoDestino.id_estado_transaccion,
          tipo_analisis: dto.tipo_analisis,
          numero_analisis: correlativo,
          id_catador: dto.id_catador,
          primer_rendimiento: dto.primer_rendimiento,
          segundo_rendimiento: dto.segundo_rendimiento,
          humedad: dto.humedad,
          dano: dto.dano,
          id_calidad: dto.id_calidad,
          observaciones: dto.observaciones,
          usuario_creacion: usuarioId,
          // Inserción anidada (Si el array viene vacío o no viene, Prisma lo ignora gracias al undefined)
          analisis_defectos: dto.defectos && dto.defectos.length > 0 ? {
            create: dto.defectos.map(d => ({
              id_defecto: d.id_defecto,
              cantidad: d.cantidad,
              usuario_creacion: usuarioId
            }))
          } : undefined,
          analisis_zarandas: dto.zarandas && dto.zarandas.length > 0 ? {
            create: dto.zarandas.map(z => ({
              id_zaranda: z.id_zaranda,
              cantidad: z.cantidad,
              usuario_creacion: usuarioId
            }))
          } : undefined,
          analisis_tazas: dto.tazas && dto.tazas.length > 0 ? {
            create: dto.tazas.map(t => ({
              id_tazas: t.id_tazas,
              cantidad: t.cantidad,
              usuario_creacion: usuarioId
            }))
          } : undefined,
        }
      });

      // B. Cambiamos el estado de la carga para que viaje virtualmente a Gerencia solo si no ha cerrado pesada
      const detalleActual = await tx.detalleRecepcion.findUnique({
        where: { id_detalle_recepcion: dto.id_detalle_recepcion },
        include: { estado_transaccion: true }
      });

      if (!detalleActual?.pesada_salida && detalleActual?.estado_transaccion?.nombre !== 'Pesada Cerrada') {
        await tx.detalleRecepcion.update({
          where: { id_detalle_recepcion: dto.id_detalle_recepcion },
          data: {
            id_estado_transaccion: estadoDestino.id_estado_transaccion,
            usuario_modificacion: usuarioId,
            fecha_modificacion: new Date(),
          }
        });
      }

      return analisis;
    });
    } catch (txErr: any) {
      console.error('[createAnalisis] ERROR en transacción Prisma:');
      console.error('  message:', txErr?.message);
      console.error('  code:', txErr?.code);
      console.error('  meta:', JSON.stringify(txErr?.meta));
      throw txErr;
    }

    try {
      await this.notificationsService.create({
        rol_destino: 'gerencia',
        titulo: 'Análisis de Laboratorio Completado',
        mensaje: `Resultados registrados para ${correlativo}. Esperando veredicto de Gerencia.`,
        tipo: 'warning',
        icono: 'ri-flask-line',
        referencia_id: String(resultado.id_analisis_calidad),
        ruta: '/recepcion/aprobacion-gerencia',
      });
    } catch (notifErr: any) {
      console.warn('[createAnalisis] Notificación falló (no crítico):', notifErr?.message);
    }

    return resultado;
  }

  // 2. VEREDICTO (Desde pantalla de Gerencia)
  async veredictoGerencia(idAnalisis: number, dto: VeredictoGerenciaDto, usuarioId: number) {
    const analisis = await this.prisma.analisisCalidad.findUnique({
      where: { id_analisis_calidad: idAnalisis },
      include: {
        detalle_recepcion: {
          include: {
            estado_transaccion: true
          }
        }
      }
    });
    if (!analisis) throw new NotFoundException('Análisis no encontrado');

    let estadoAnalisisNombre = '';
    let estadoDetalleNombre = '';

    if (dto.veredicto === 'APROBAR') {
      estadoAnalisisNombre = 'Muestra Aprobada';
      if (analisis.tipo_analisis === 'Muestra General') {
        // En Muestra General la carga ya descargó en patio.
        // Si ya tiene pesada de salida registrada o ya estaba cerrada en báscula, DEBE mantenerse como Pesada Cerrada.
        if (analisis.detalle_recepcion?.pesada_salida != null || analisis.detalle_recepcion?.estado_transaccion?.nombre === 'Pesada Cerrada') {
          estadoDetalleNombre = 'Pesada Cerrada';
        } else {
          // Si aún no pesa salida, queda en Pesada Abierta para que báscula capture la tara
          estadoDetalleNombre = 'Pesada Abierta';
        }
      } else {
        estadoDetalleNombre = 'Muestra Aprobada';
      }
    } else if (dto.veredicto === 'SEGUNDA_MUESTRA') {
      estadoAnalisisNombre = 'Muestra Rechazada'; // Se rechaza este análisis en específico (historial)
      estadoDetalleNombre = 'Pendiente de Muestrear'; // La carga física regresa al patio para nuevo muestreo
    } else if (dto.veredicto === 'DEVOLUCION') {
      estadoAnalisisNombre = 'Muestra Rechazada';
      estadoDetalleNombre = 'Muestra Rechazada';
    } else {
      throw new InternalServerErrorException('Veredicto inválido');
    }

    const estadoAnalisis = await this.prisma.estadoTransaccion.findUnique({ where: { nombre: estadoAnalisisNombre } });
    const estadoDetalle = await this.prisma.estadoTransaccion.findUnique({ where: { nombre: estadoDetalleNombre } });

    if (!estadoAnalisis || !estadoDetalle) throw new InternalServerErrorException(`Uno o más estados de transacción no fueron encontrados en BD`);

    const resultado = await this.prisma.$transaction(async (tx) => {
      const nuevaObs = dto.observaciones ? `${analisis.observaciones || ''}\n[Gerencia]: ${dto.observaciones}` : analisis.observaciones;
      
      // Actualizar el Análisis
      await tx.analisisCalidad.update({
        where: { id_analisis_calidad: idAnalisis },
        data: { id_estado_transaccion: estadoAnalisis.id_estado_transaccion, observaciones: nuevaObs, usuario_modificacion: usuarioId, fecha_modificacion: new Date() }
      });

      // Actualizar la Carga en Patio
      await tx.detalleRecepcion.update({
        where: { id_detalle_recepcion: analisis.id_detalle_recepcion },
        data: { id_estado_transaccion: estadoDetalle.id_estado_transaccion, usuario_modificacion: usuarioId, fecha_modificacion: new Date() }
      });

      return { success: true, estado: estadoDetalleNombre };
    });

    try {
      let rolDestino = 'bascula';
      let rutaDestino = '/recepcion/bascula';
      let mensaje = `El análisis ${analisis.numero_analisis} fue APROBADO por Gerencia. Listo para pesaje en báscula.`;
      let tipoNotif = 'success';
      let iconoNotif = 'ri-checkbox-circle-line';

      if (dto.veredicto === 'SEGUNDA_MUESTRA') {
        rolDestino = 'muestreo';
        rutaDestino = '/recepcion/muestreo';
        mensaje = `Gerencia solicitó SEGUNDA MUESTRA para el análisis ${analisis.numero_analisis}.`;
        tipoNotif = 'warning';
        iconoNotif = 'ri-repeat-line';
      } else if (dto.veredicto === 'DEVOLUCION') {
        rolDestino = 'bascula';
        rutaDestino = '/recepcion/bascula';
        mensaje = `Gerencia RECHAZÓ el lote del análisis ${analisis.numero_analisis}. Generar pase de salida.`;
        tipoNotif = 'danger';
        iconoNotif = 'ri-close-circle-line';
      }

      await this.notificationsService.create({
        rol_destino: rolDestino,
        titulo: `Veredicto de Gerencia: ${dto.veredicto}`,
        mensaje,
        tipo: tipoNotif,
        icono: iconoNotif,
        referencia_id: String(idAnalisis),
        ruta: rutaDestino,
      });
    } catch (notifErr: any) {
      console.warn('[veredictoGerencia] Notificación falló (no crítico):', notifErr?.message);
    }

    return resultado;
  }

  // 3. BUSCAR ANÁLISIS POR No. INGRESO O REMISIÓN (para reimpresión)
  async buscarAnalisis(q: string) {
    if (!q || q.trim().length < 2) return [];
    const term = q.trim().toLowerCase();
    return this.prisma.analisisCalidad.findMany({
      where: {
        OR: [
          { detalle_recepcion: { recepcion: { numero_entrada: { contains: term, mode: 'insensitive' } } } },
          { detalle_recepcion: { remision: { contains: term, mode: 'insensitive' } } },
        ],
      },
      include: {
        detalle_recepcion: { include: { proveedor: true, recepcion: true, estado_transaccion: true, tipo_cafe: true } },
        catador: true, calidad: true, estado_transaccion: true,
        analisis_defectos: { include: { defecto: true } },
        analisis_zarandas: { include: { zaranda: true } },
        analisis_tazas: { include: { taza: true } },
      },
      orderBy: { fecha_analisis: 'desc' },
      take: 50,
    });
  }

  // 4. LISTAR PARA GERENCIA (Extrae solo los que ocupan autorización)
  async findAllPendientes() {
    return this.prisma.analisisCalidad.findMany({
      where: { 
        estado_transaccion: { 
          nombre: {
            in: [
              'Muestra Previa Pendiente de Aprobacion',
              'Muestra General Pendiente de Aprobacion'
            ]
          }
        } 
      },
      include: {
        detalle_recepcion: { 
          include: { 
            proveedor: true, 
            recepcion: true, 
            estado_transaccion: true,
            tipo_remision: true,
            tipo_cafe: true,
            tipo_empaque: true
          } 
        },
        catador: true, calidad: true, estado_transaccion: true,
        analisis_defectos: { include: { defecto: true } },
        analisis_zarandas: { include: { zaranda: true } },
        analisis_tazas: { include: { taza: true } }
      },
      orderBy: { fecha_analisis: 'desc' }
    });
  }

  // 5. COMPARATIVO POR RANGO DE FECHAS
  async buscarComparativoFechas(fechaInicio: string, fechaFin: string) {
    if (!fechaInicio || !fechaFin) return [];

    const startStr = fechaInicio.includes('T') ? fechaInicio : `${fechaInicio}T00:00:00`;
    const endStr = fechaFin.includes('T') ? fechaFin : `${fechaFin}T23:59:59.999`;
    const start = new Date(startStr);
    const end = new Date(endStr);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Formato de fechas inválido');
    }

    // Identificar los id_detalle_recepcion con análisis o recepción dentro del rango
    const analisisEnRango = await this.prisma.analisisCalidad.findMany({
      where: {
        OR: [
          { fecha_analisis: { gte: start, lte: end } },
          { detalle_recepcion: { recepcion: { fecha_entrada: { gte: start, lte: end } } } }
        ]
      },
      select: { id_detalle_recepcion: true }
    });

    const idsDetalle = Array.from(new Set(analisisEnRango.map((a) => a.id_detalle_recepcion)));

    if (idsDetalle.length === 0) return [];

    // Obtener todos los análisis asociados para completar la comparación (Previa y General)
    return this.prisma.analisisCalidad.findMany({
      where: {
        id_detalle_recepcion: { in: idsDetalle }
      },
      include: {
        detalle_recepcion: {
          include: {
            proveedor: true,
            recepcion: {
              include: {
                placa_cabezal: true
              }
            },
            estado_transaccion: true,
            tipo_cafe: true,
          }
        },
        catador: true,
        calidad: true,
        estado_transaccion: true,
        analisis_defectos: { include: { defecto: true } },
        analisis_zarandas: { include: { zaranda: true } },
        analisis_tazas: { include: { taza: true } }
      },
      orderBy: { fecha_analisis: 'desc' }
    });
  }
}