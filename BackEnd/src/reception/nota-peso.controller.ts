import { Controller, Get, Post, Param, UseGuards, Request } from '@nestjs/common';
import { NotaPesoService } from './nota-peso.service';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('nota-peso')
@ApiBearerAuth()
@Controller('nota-peso')
export class NotaPesoController {
  constructor(private readonly notaPesoService: NotaPesoService) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_NOTA_PESO')
  @Get('pendientes')
  getPendientes() {
    return this.notaPesoService.getPendientesLiquidar();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('CREAR_NOTA_PESO')
  @Post('liquidar/:idDetalle')
  crearNotaPeso(@Param('idDetalle') idDetalle: string, @Request() req) {
    return this.notaPesoService.crearNotaPeso(+idDetalle, req.user?.id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_NOTA_PESO')
  @Get()
  findAll() {
    return this.notaPesoService.findAll();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_NOTA_PESO')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notaPesoService.findOne(+id);
  }
}
