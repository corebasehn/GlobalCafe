import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class NotaPesoService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsGateway,
  ) {}

  // 1. Obtener detalles de recepción listos para liquidar (Pesada Cerrada y sin Nota de Peso)
  async getPendientesLiquidar() {
    return this.prisma.detalleRecepcion.findMany({
      where: {
        estado: true,
        estado_transaccion: { nombre: 'Pesada Cerrada' },
        notas_peso: { none: {} }, // Que no tengan nota de peso aún
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
        analisis_calidad: {
          orderBy: { fecha_analisis: 'desc' },
          take: 1,
        },
      },
      orderBy: { fecha_modificacion: 'desc' },
    });
  }

  // 2. Crear la Nota de Peso (Liquidación)
  async crearNotaPeso(idDetalle: number, usuarioId: number) {
    const detalle = await this.prisma.detalleRecepcion.findUnique({
      where: { id_detalle_recepcion: idDetalle },
      include: {
        recepcion: true,
        analisis_calidad: {
          orderBy: { fecha_analisis: 'desc' },
          take: 1,
        },
      },
    });

    if (!detalle) throw new NotFoundException('Detalle de recepción no encontrado');
    if (!detalle.peso_neto) throw new InternalServerErrorException('El registro no tiene peso neto de báscula');

    // --- LÓGICA DE CÁLCULO SEGÚN FORMATO ---
    
    // 1. Peso Neto Bascula (viene en Libras LB)
    const pesoNetoLB = Number(detalle.peso_neto);
    
    // 2. Convertir a Quintales (QQ) -> 1 QQ = 100 LB
    const pesoBrutoQQ = pesoNetoLB / 100;
    
    // 3. Calcular Tara de Sacos (0.50 LB por saco es estándar en muchas empresas)
    // Según el formato: Tara (QQ) = (Sacos * 0.5) / 100
    const taraQQ = (detalle.cantidad_sacos * 0.5) / 100;
    
    // 4. Peso Neto antes de descuentos
    const subtotalQQ = pesoBrutoQQ - taraQQ;

    // 5. Obtener descuentos de Laboratorio
    const analisis = detalle.analisis_calidad[0];
    const humedadPerc = analisis?.humedad ? Number(analisis.humedad) : 0;
    const danoPerc = analisis?.dano ? Number(analisis.dano) : 0;

    // Lógica de Descuento de Humedad: Si es mayor a 12%, se descuenta el excedente
    // Nota: Esta es una fórmula común, se puede ajustar si el cliente pide otra.
    let descuentoHumedadQQ = 0;
    if (humedadPerc > 12) {
        descuentoHumedadQQ = subtotalQQ * ((humedadPerc - 12) / 100);
    }

    // Descuento por Daño
    const descuentoDanoQQ = subtotalQQ * (danoPerc / 100);

    // 6. Peso Neto Final
    const pesoNetoFinalQQ = subtotalQQ - descuentoHumedadQQ - descuentoDanoQQ;

    return this.prisma.$transaction(async (tx) => {
      // Generar Correlativo NP-0000001
      const count = await tx.notaDePeso.count();
      const correlativo = `NP-${String(count + 1).padStart(7, '0')}`;

      const notaPeso = await tx.notaDePeso.create({
        data: {
          id_detalle_recepcion: idDetalle,
          numero_nota_peso: correlativo,
          usuario_creacion: usuarioId,
          detalles: {
            create: {
              cantidad_sacos: detalle.cantidad_sacos,
              peso_bruto: pesoBrutoQQ,
              tara: taraQQ,
              porcentaje_descuento_humedad: humedadPerc,
              porcentaje_descuento_dano: danoPerc,
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
      where: { estado: true },
      include: {
        detalles: true,
        detalle_recepcion: {
          include: {
            recepcion: {
              include: { cosecha: true }
            },
            proveedor: true,
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
