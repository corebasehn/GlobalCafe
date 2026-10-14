import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { NotificationsGateway } from './notifications.gateway';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gateway: NotificationsGateway,
  ) {}

  /**
   * Crea una nueva notificación en la base de datos y la emite en tiempo real vía WebSocket.
   */
  async create(data: CreateNotificationDto) {
    const notificacion = await this.prisma.notificacion.create({
      data: {
        titulo: data.titulo,
        mensaje: data.mensaje,
        rol_destino: data.rol_destino ? data.rol_destino.toLowerCase().trim() : null,
        usuario_id: data.usuario_id || null,
        tipo: data.tipo || 'info',
        icono: data.icono || 'ri-notification-line',
        referencia_id: data.referencia_id ? String(data.referencia_id) : null,
        ruta: data.ruta || null,
      },
    });

    // Emite la notificación en vivo a todos los clientes conectados
    this.gateway.emitNotification('nueva_notificacion', notificacion);

    return notificacion;
  }

  /**
   * Obtiene las notificaciones no leídas para el usuario o su rol.
   */
  async getUnread(user?: { id?: number; roles?: string[] | string }) {
    let whereClause: any = { leido: false };

    if (user) {
      const rawRoles = Array.isArray(user.roles)
        ? user.roles
        : typeof user.roles === 'string'
        ? [user.roles]
        : [];

      // Normalizar roles a minúsculas para comparaciones consistentes
      const userRoles = rawRoles.map((r) => String(r).toLowerCase().trim());
      const isAdmin = userRoles.some((r) => r.includes('admin'));

      if (!isAdmin) {
        const targetRoles = new Set<string>();
        for (const r of userRoles) {
          targetRoles.add(r);
          if (r.includes('muestreo')) targetRoles.add('muestreo');
          if (r.includes('lab')) targetRoles.add('laboratorio');
          if (r.includes('bascula')) targetRoles.add('bascula');
          if (r.includes('recep')) targetRoles.add('recepcion');
          if (r.includes('geren') || r.includes('aprob')) targetRoles.add('gerencia');
        }

        whereClause = {
          leido: false,
          OR: [
            ...(user.id ? [{ usuario_id: user.id }] : []),
            { rol_destino: { in: Array.from(targetRoles) } },
            { rol_destino: null, usuario_id: null }, // Globales
          ],
        };
      }
    }

    return this.prisma.notificacion.findMany({
      where: whereClause,
      orderBy: { created_at: 'desc' },
      take: 50,
    });
  }

  /**
   * Marca una notificación como leída por su ID.
   */
  async markAsRead(id: number) {
    const notificacion = await this.prisma.notificacion.update({
      where: { id },
      data: { leido: true },
    });

    this.gateway.emitNotification('notificacion_leida', { id });
    return notificacion;
  }

  /**
   * Marca como leídas todas las notificaciones pendientes de un usuario o rol.
   */
  async markAllAsRead(user?: { id?: number; roles?: string[] | string }) {
    let whereClause: any = { leido: false };

    if (user) {
      const rawRoles = Array.isArray(user.roles)
        ? user.roles
        : typeof user.roles === 'string'
        ? [user.roles]
        : [];
      const userRoles = rawRoles.map((r) => String(r).toLowerCase().trim());

      whereClause = {
        leido: false,
        OR: [
          ...(user.id ? [{ usuario_id: user.id }] : []),
          ...(userRoles.length > 0 ? [{ rol_destino: { in: userRoles } }] : []),
        ],
      };
    }

    const result = await this.prisma.notificacion.updateMany({
      where: whereClause,
      data: { leido: true },
    });

    this.gateway.emitNotification('todas_leidas', { count: result.count });
    return result;
  }
}
