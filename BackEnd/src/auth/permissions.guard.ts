import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.permisos) {
      throw new ForbiddenException('No tienes permisos suficientes (No hay sesión válida)');
    }

    // Permitir si tiene el comodín '*' (Súper Admin)
    if (user.permisos.includes('*')) {
      return true;
    }

    // Verificar si el usuario tiene AL MENOS UNO de los permisos requeridos (Lógica OR)
    const hasPermission = requiredPermissions.some((permission) =>
      user.permisos.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(`No tienes los permisos requeridos: ${requiredPermissions.join(', ')}`);
    }

    return true;
  }
}