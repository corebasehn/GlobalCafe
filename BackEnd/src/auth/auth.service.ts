import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const normalizedUsername = username.trim().toLowerCase();
    const user = await this.usersService.findOne(normalizedUsername);

    if (!user || !(await bcrypt.compare(pass, user.clave_hash))) {
      throw new UnauthorizedException('Credenciales incorrectas');
    } else if (!user.activo) {
      throw new UnauthorizedException('Usuario inactivo');
    }
    
    const roles = user.roles.map((r) => r.rol.nombre);
    
    // 1. Extraemos y aplanamos todos los códigos de permisos de los roles del usuario
    const permisos = user.roles.flatMap(ur => 
      ur.rol.permisos.map(rp => rp.permiso.codigo)
    );
    // 2. Eliminamos duplicados
    const permisosUnicos = [...new Set(permisos)];

    // Obtener la sucursal (priorizando el área principal)
    const areaPrincipal = user.usuario_areas?.find((ua) => ua.es_area_principal) || user.usuario_areas?.[0];
    const id_sucursal = areaPrincipal?.area?.id_sucursal || null;

    const payload = { sub: user.id, username: user.usuario, nombre: user.nombre_visible, roles, id_sucursal, permisos: permisosUnicos };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        username: user.usuario,
        nombre: user.nombre_visible,
        roles,
        id_sucursal,
        permisos: permisosUnicos,
      }
    };
  }

  async refresh(user: any) {
    const payload = { sub: user.id, username: user.username, roles: user.roles, id_sucursal: user.id_sucursal, permisos: user.permisos };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async cambiarClave(userId: number, claveActual: string, claveNueva: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(claveActual, user.clave_hash);
    if (!isMatch) {
      throw new UnauthorizedException('La contraseña actual es incorrecta');
    }

    // Actualizar clave usando el servicio de usuarios
    await this.usersService.update(userId, { password: claveNueva } as any, { id: userId, username: user.usuario, nombre: user.nombre_visible });
    
    return { message: 'Contraseña actualizada correctamente' };
  }
}