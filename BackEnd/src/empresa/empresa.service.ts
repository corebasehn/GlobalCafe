import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private prisma: PrismaService) {}

  async getEmpresa() {
    const empresa = await this.prisma.empresa.findFirst({
      where: { activo: true },
      include: {
        configuracion_visual: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException('No se encontró información de la empresa configurada.');
    }

    return empresa;
  }

  async updateEmpresa(data: UpdateEmpresaDto, usuarioId: number) {
    const empresa = await this.prisma.empresa.findFirst({
      where: { activo: true },
    });

    if (!empresa) {
      throw new NotFoundException('No hay una empresa activa para actualizar.');
    }

    return this.prisma.empresa.update({
      where: { id_empresa: empresa.id_empresa },
      data: {
        ...data,
        usuario_actualizacion: usuarioId,
        fecha_actualizacion: new Date(),
      },
    });
  }
}
