import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('empresa')
@ApiBearerAuth()
@UseGuards(AuthGuard, PermissionsGuard)
@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @ApiOperation({ summary: 'Obtener información de la empresa' })
  @RequirePermissions('VER_CONFIGURACION')
  @Get('config')
  getEmpresa() {
    return this.empresaService.getEmpresa();
  }

  @ApiOperation({ summary: 'Actualizar información de la empresa' })
  @RequirePermissions('VER_CONFIGURACION')
  @Patch('config')
  updateEmpresa(@Body() data: UpdateEmpresaDto, @Request() req) {
    return this.empresaService.updateEmpresa(data, req.user.id);
  }
}

