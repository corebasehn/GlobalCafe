import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';
import { LiquidarNotaPesoDto } from './dto/liquidar-nota-peso.dto';
import {
  formatCodigoCosecha,
  generarCorrelativos,
  getCodigoCosechaById,
  resolverOrigenRemision,
} from './correlativos.helper';

@Injectable()
export class NotaPesoService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsGateway,
  ) {}

  // 1. Obtener detalles de recepción listos para liquidar (Pesada Cerrada y sin Nota de Peso, solo Café normal)
  async getPendientesLiquidar() {
    return this.prisma.detalleRecepcion.findMany({
      where: {
        estado: true,
        estado_transaccion: { nombre: 'Pesada Cerrada' },
        notas_peso: { none: {} }, // Que no tengan nota de peso aún
        recepcion: {
          estado: true,
          cosecha: { cosecha_actual: true },
          OR: [
            { id_tipo_movimiento: 1 },
            { id_tipo_movimiento: null },
          ],
        },
      },
      include: {
        recepcion: {
          include: {
            conductor: true,
            placa_cabezal: true,
            cosecha: true,
          },
        },
        proveedor: true,
        estado_transaccion: true,
        tipo_remision: true,
        tipo_cafe: true,
        tipo_empaque: true,
        analisis_calidad: {
          orderBy: { fecha_analisis: 'desc' },
        },
      },
      orderBy: { fecha_modificacion: 'desc' },
    });
  }

  // 2. Crear la Nota de Peso (Liquidación)
  async crearNotaPeso(idDetalle: number, usuarioId: number, dto?: LiquidarNotaPesoDto) {
    const detalle = await this.prisma.detalleRecepcion.findUnique({
      where: { id_detalle_recepcion: idDetalle },
      include: {
        recepcion: { include: { cosecha: true } },
        tipo_remision: true,
        tipo_empaque: true,
        analisis_calidad: {
          orderBy: { fecha_analisis: 'desc' },
        },
      },
    });

    if (!detalle) throw new NotFoundException('Detalle de recepción no encontrado');
    if (detalle.recepcion?.id_tipo_movimiento && detalle.recepcion.id_tipo_movimiento !== 1) {
      throw new InternalServerErrorException('Las transacciones de otros movimientos no se liquidan con nota de peso');
    }
    if (!detalle.peso_neto) throw new InternalServerErrorException('El registro no tiene peso neto de báscula');

    // Validación de Muestra General (obligatoria a menos que la recepción tenga omitir análisis externo)
    if (!detalle.omitir_analisis) {
      const tieneMuestraGeneral = detalle.analisis_calidad.some(
        a => a.tipo_analisis === 'Muestra General' || a.tipo_analisis?.toLowerCase().includes('general')
      );
      if (!tieneMuestraGeneral) {
        throw new BadRequestException('No se puede liquidar: La muestra general no ha sido creada para este ingreso.');
      }
    }

    // --- LÓGICA DE CÁLCULO SEGÚN FORMATO ---
    
    // 1. Peso Neto Bascula (viene en Libras LB)
    const pesoNetoLB = Number(detalle.peso_neto);
    
    // 2. Convertir a Quintales (QQ) -> 1 QQ = 100 LB
    const pesoBrutoQQ = pesoNetoLB / 100;
    
    // 3. Calcular Tara de Sacos según tipo de empaque (fallback a 0.50 LB si no está configurado)
    // Según el formato: Tara (QQ) = (Sacos * taraUnitariaLB) / 100
    const taraUnitariaLB = detalle.tipo_empaque?.tara != null ? Number(detalle.tipo_empaque.tara) : 0.5;
    const taraQQ = (detalle.cantidad_sacos * taraUnitariaLB) / 100;
    
    // 4. Peso Neto antes de descuentos
    const subtotalQQ = pesoBrutoQQ - taraQQ;

    // 5. Obtener descuentos (del DTO editado por el usuario o de la muestra de laboratorio como fallback)
    const analisis = detalle.analisis_calidad.find(
      a => a.tipo_analisis === 'Muestra General' || a.tipo_analisis?.toLowerCase().includes('general')
    ) || detalle.analisis_calidad[0];
    const humedadPerc = dto?.humedad !== undefined && dto?.humedad !== null
      ? Number(dto.humedad)
      : (analisis?.humedad ? Number(analisis.humedad) : 0);

    const danoPerc = dto?.dano !== undefined && dto?.dano !== null
      ? Number(dto.dano)
      : (analisis?.dano ? Number(analisis.dano) : 0);

    const otrosPerc = dto?.otros_descuentos !== undefined && dto?.otros_descuentos !== null
      ? Number(dto.otros_descuentos)
      : 0;

    // Lógica de Descuento de Humedad: Si es mayor a 12%, se descuenta el excedente
    let descuentoHumedadQQ = 0;
    if (humedadPerc > 12) {
      descuentoHumedadQQ = subtotalQQ * ((humedadPerc - 12) / 100);
    }

    // Descuento por Daño
    const descuentoDanoQQ = subtotalQQ * (danoPerc / 100);

    // Descuento por Otros
    const descuentoOtrosQQ = subtotalQQ * (otrosPerc / 100);

    // 6. Peso Neto Final
    const pesoNetoFinalQQ = Math.max(0, subtotalQQ - descuentoHumedadQQ - descuentoDanoQQ - descuentoOtrosQQ);

    return this.prisma.$transaction(async (tx) => {
      const codCosecha = detalle.recepcion?.cosecha?.cosecha
        ? formatCodigoCosecha(detalle.recepcion.cosecha.cosecha)
        : await getCodigoCosechaById(tx, detalle.recepcion?.id_cosecha);

      // Correlativo independiente por origen (Global/Externo) y cosecha
      // (Ej: NP-INT-2627-0000001 / NP-EXT-2627-0000001)
      const origen = resolverOrigenRemision({
        idTipoRemision: detalle.id_tipo_remision,
        nombreTipoRemision: detalle.tipo_remision?.tipo_remision,
        numeroEntrada: detalle.recepcion?.numero_entrada,
      });
      const [correlativo] = await generarCorrelativos({
        prefix: `NP-${origen}`,
        codCosecha,
        digits: 7,
        countFn: (base) =>
          tx.notaDePeso.count({
            where: { numero_nota_peso: { startsWith: base } },
          }),
        existsFn: async (candidate) =>
          Boolean(
            await tx.notaDePeso.findUnique({
              where: { numero_nota_peso: candidate },
              select: { id_nota_peso: true },
            }),
          ),
      });

      const notaPeso = await tx.notaDePeso.create({
        data: {
          id_detalle_recepcion: idDetalle,
          numero_nota_peso: correlativo,
          observaciones: dto?.observaciones?.trim() || null,
          usuario_creacion: usuarioId,
          detalles: {
            create: {
              cantidad_sacos: detalle.cantidad_sacos,
              peso_bruto: pesoBrutoQQ,
              tara: taraQQ,
              porcentaje_descuento_humedad: humedadPerc,
              porcentaje_descuento_dano: danoPerc,
              porcentaje_descuento_peso: otrosPerc,
              peso_neto: pesoNetoFinalQQ,
              usuario_creacion: usuarioId,
            },
          },
        },
        include: { detalles: true },
      });

      // Opcional: Cambiar estado a "Liquidado" si existiera tal estado, 
      // o simplemente confiar en que ya tiene Nota de Peso.
      
      this.notifications.emitNotification('new_notification', {
        title: 'Liquidación Completada',
        message: `Se generó la Nota de Peso ${correlativo} para la remisión ${detalle.remision}.`,
        type: 'success',
        module: 'RECEPCION',
      });

      return notaPeso;
    });
  }

  // 3. Obtener todas las notas de peso emitidas
  async findAll() {
    return this.prisma.notaDePeso.findMany({
      where: {
        estado: true,
        detalle_recepcion: {
          recepcion: {
            estado: true,
            cosecha: { cosecha_actual: true },
          },
        },
      },
      include: {
        detalles: true,
        detalle_recepcion: {
          include: {
            recepcion: {
              include: { cosecha: true }
            },
            proveedor: true,
            tipo_cafe: true,
          },
        },
      },
      orderBy: { fecha_nota_peso: 'desc' },
    });
  }

  // 4. Obtener una nota de peso específica (para impresión)
  async findOne(id: number) {
    const nota = await this.prisma.notaDePeso.findUnique({
      where: { id_nota_peso: id },
      include: {
        detalles: true,
        detalle_recepcion: {
          include: {
            recepcion: {
              include: { 
                conductor: true, 
                placa_cabezal: true, 
                placa_furgon: true,
                cosecha: true,
                sucursal: {
                    include: { empresa: true }
                }
              }
            },
            proveedor: true,
            tipo_remision: true,
            tipo_cafe: true,
            tipo_empaque: true,
            analisis_calidad: {
                include: { catador: true }
            }
          },
        },
      },
    });

    if (!nota) throw new NotFoundException('Nota de peso no encontrada');
    return nota;
  }
}
