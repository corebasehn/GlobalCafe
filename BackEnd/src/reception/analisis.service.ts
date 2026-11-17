import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAnalisisDto, VeredictoGerenciaDto } from './dto/create-analisis.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { formatCodigoCosecha, generarCorrelativos, getCodigoCosechaById } from './correlativos.helper';

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

    let resultado: any;
    try {
    resultado = await this.prisma.$transaction(async (tx) => {
      const detalleActual = await tx.detalleRecepcion.findUnique({
        where: { id_detalle_recepcion: dto.id_detalle_recepcion },
        include: {
          estado_transaccion: true,
          notas_patio: true,
          recepcion: { include: { cosecha: true } },
        },
      });
      if (!detalleActual) {
        throw new NotFoundException('Detalle de recepción no encontrado');
      }

      // Si la carga ya tiene Nota de Patio o pesada de salida, cualquier análisis nuevo es Muestra General
      const tieneNotaPatio = (detalleActual.notas_patio?.length ?? 0) > 0;
      const yaCerroPesada =
        detalleActual.pesada_salida != null ||
        detalleActual.estado_transaccion?.nombre === 'Pesada Cerrada';
      const tipoAnalisisReal =
        dto.tipo_analisis === 'Muestra General' || tieneNotaPatio || yaCerroPesada
          ? 'Muestra General'
          : dto.tipo_analisis;

      const nombreEstadoReal =
        tipoAnalisisReal === 'Muestra General'
          ? 'Muestra General Pendiente de Aprobacion'
          : 'Muestra Previa Pendiente de Aprobacion';

      const estadoAnalisisDestino =
        nombreEstadoReal === nombreEstadoDestino
          ? estadoDestino
          : await tx.estadoTransaccion.findUnique({ where: { nombre: nombreEstadoReal } });

      if (!estadoAnalisisDestino) {
        throw new InternalServerErrorException(`El estado "${nombreEstadoReal}" no existe en BD`);
      }

      const codCosecha = detalleActual.recepcion?.cosecha?.cosecha
        ? formatCodigoCosecha(detalleActual.recepcion.cosecha.cosecha)
        : await getCodigoCosechaById(tx, detalleActual.recepcion?.id_cosecha);

      // Generar correlativo por cosecha (Ej: AN-2627-0001)
      const [correlativo] = await generarCorrelativos({
        prefix: 'AN',
        codCosecha,
        digits: 4,
        countFn: (base) =>
          tx.analisisCalidad.count({
            where: { numero_analisis: { startsWith: base } },
          }),
        existsFn: async (candidate) =>
          Boolean(
            await tx.analisisCalidad.findFirst({
              where: { numero_analisis: candidate },
              select: { id_analisis_calidad: true },
            }),
          ),
      });

      // A. Guardamos el resultado del laboratorio
      const analisis = await tx.analisisCalidad.create({
        data: {
          id_detalle_recepcion: dto.id_detalle_recepcion,
          id_estado_transaccion: estadoAnalisisDestino.id_estado_transaccion,
          tipo_analisis: tipoAnalisisReal,
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
      if (!yaCerroPesada) {
        await tx.detalleRecepcion.update({
          where: { id_detalle_recepcion: dto.id_detalle_recepcion },
          data: {
            id_estado_transaccion: estadoAnalisisDestino.id_estado_transaccion,
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
        mensaje: `Resultados registrados para ${resultado.numero_analisis}. Esperando veredicto de Gerencia.`,
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
            estado_transaccion: true,
            notas_patio: true,
          }
        }
      }
    });
    if (!analisis) throw new NotFoundException('Análisis no encontrado');

    const yaCerroPesada =
      analisis.detalle_recepcion?.pesada_salida != null ||
      analisis.detalle_recepcion?.estado_transaccion?.nombre === 'Pesada Cerrada';
    const tieneNotaPatio = (analisis.detalle_recepcion?.notas_patio?.length ?? 0) > 0;
    const esMuestraGeneral =
      analisis.tipo_analisis === 'Muestra General' ||
      (analisis.tipo_analisis || '').toLowerCase().includes('general') ||
      tieneNotaPatio ||
      yaCerroPesada;

    let estadoAnalisisNombre = '';
    let estadoDetalleNombre = '';

    if (dto.veredicto === 'APROBAR') {
      estadoAnalisisNombre = 'Muestra Aprobada';
      if (yaCerroPesada) {
        // Si ya tiene pesada de salida registrada o ya estaba cerrada en báscula, SIEMPRE debe mantenerse como Pesada Cerrada.
        estadoDetalleNombre = 'Pesada Cerrada';
      } else if (esMuestraGeneral) {
        // En Muestra General la carga ya descargó en patio; si aún no pesa salida, queda en Pesada Abierta para capturar tara
        estadoDetalleNombre = 'Pesada Abierta';
      } else {
        estadoDetalleNombre = 'Muestra Aprobada';
      }
    } else if (dto.veredicto === 'SEGUNDA_MUESTRA') {
      estadoAnalisisNombre = 'Muestra Rechazada'; // Se rechaza este análisis en específico (historial)
      if (yaCerroPesada) {
        // Si ya cerró pesada en báscula, se mantiene en Pesada Cerrada para no regresarla a báscula ni sacarla de Nota de Peso
        estadoDetalleNombre = 'Pesada Cerrada';
      } else if (esMuestraGeneral) {
        // Si ya tiene Nota de Patio pero aún no pesa salida, regresa a Muestra General Recibida (para Laboratorio y Báscula)
        estadoDetalleNombre = 'Muestra General Recibida';
      } else {
        estadoDetalleNombre = 'Pendiente de Muestrear'; // La carga física regresa al patio para nuevo muestreo previo
      }
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
      
      // Actualizar el Análisis (y corregir tipo_analisis a Muestra General si ya tenía Nota de Patio / Pesada Cerrada)
      await tx.analisisCalidad.update({
        where: { id_analisis_calidad: idAnalisis },
        data: {
          id_estado_transaccion: estadoAnalisis.id_estado_transaccion,
          tipo_analisis: esMuestraGeneral ? 'Muestra General' : analisis.tipo_analisis,
          observaciones: nuevaObs,
          usuario_modificacion: usuarioId,
          fecha_modificacion: new Date(),
        }
      });

      // Actualizar la Carga en Patio
      await tx.detalleRecepcion.update({
        where: { id_detalle_recepcion: analisis.id_detalle_recepcion },
        data: { id_estado_transaccion: estadoDetalle.id_estado_transaccion, usuario_modificacion: usuarioId, fecha_modificacion: new Date() }
      });

      return { success: true, estado: estadoDetalleNombre };
    });

    try {
      let rolDestino = esMuestraGeneral && yaCerroPesada ? 'recepcion' : 'bascula';
      let rutaDestino = esMuestraGeneral && yaCerroPesada ? '/recepcion/nota-peso' : '/recepcion/bascula';
      let mensaje = esMuestraGeneral && yaCerroPesada
        ? `El análisis general ${analisis.numero_analisis} fue APROBADO por Gerencia. Listo para liquidar en Nota de Peso.`
        : `El análisis ${analisis.numero_analisis} fue APROBADO por Gerencia. Listo para pesaje en báscula.`;
      let tipoNotif = 'success';
      let iconoNotif = 'ri-checkbox-circle-line';

      if (dto.veredicto === 'SEGUNDA_MUESTRA') {
        rolDestino = esMuestraGeneral ? 'laboratorio' : 'muestreo';
        rutaDestino = esMuestraGeneral ? '/recepcion/laboratorio' : '/recepcion/muestreo';
        mensaje = esMuestraGeneral
          ? `Gerencia solicitó SEGUNDA MUESTRA GENERAL para el análisis ${analisis.numero_analisis}. Ingrese nuevamente el análisis en Laboratorio.`
          : `Gerencia solicitó SEGUNDA MUESTRA para el análisis ${analisis.numero_analisis}.`;
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
        detalle_recepcion: {
          recepcion: {
            estado: true,
            cosecha: { cosecha_actual: true },
          },
        },
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
        detalle_recepcion: {
          estado: true,
          recepcion: {
            estado: true,
            cosecha: { cosecha_actual: true },
          },
        },
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
        detalle_recepcion: {
          recepcion: {
            estado: true,
            cosecha: { cosecha_actual: true },
          },
        },
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