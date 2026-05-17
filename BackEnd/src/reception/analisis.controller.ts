import { Controller, Get, Post, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { AnalisisService } from './analisis.service';
import { CreateAnalisisDto, VeredictoGerenciaDto } from './dto/create-analisis.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('analisis')
@ApiBearerAuth()
@Controller('analisis')
export class AnalisisController {
  constructor(private readonly analisisService: AnalisisService) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('CREAR_MUESTRA')
  @Post()
  create(@Body() createAnalisisDto: CreateAnalisisDto, @Request() req) {
    return this.analisisService.createAnalisis(createAnalisisDto, req.user?.id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_MUESTRA', 'VER_APROBACIONES')
  @Get('pendientes')
  findAllPendientes() {
    return this.analisisService.findAllPendientes();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('APROBAR_MUESTRA')
  @Patch(':id/veredicto')
  veredicto(@Param('id') id: string, @Body() dto: VeredictoGerenciaDto, @Request() req) {
    return this.analisisService.veredictoGerencia(+id, dto, req.user?.id);
  }
}