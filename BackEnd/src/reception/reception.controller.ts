import { Controller, Get, Post, Put, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { CreateReceptionDto } from './dto/create-reception.dto';
import { UpdateReceptionDto } from './dto/update-reception.dto';
import { AuthGuard } from '../auth/auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'; 

@ApiTags('reception')
@ApiBearerAuth()
@Controller('reception')
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

  @UseGuards(AuthGuard, PermissionsGuard) 
  @RequirePermissions('CREAR_RECEPCION')
  @Post()
  create(@Body() createReceptionDto: CreateReceptionDto, @Request() req) {
    if (!req.user || !req.user.id) {
       throw new Error('El usuario no está autenticado correctamente o no tiene ID');
    }
    return this.receptionService.create(createReceptionDto, req.user.id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_RECEPCION', 'VER_MUESTREO', 'VER_MUESTRA', 'VER_BASCULA')
  @Get()
  findAll() {
    return this.receptionService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('resumen-hoy')
  getResumen() {
    return this.receptionService.getResumenHoy();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_RECEPCION')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receptionService.findOne(+id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('EDITAR_RECEPCION')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReceptionDto: UpdateReceptionDto, @Request() req) {
    return this.receptionService.update(+id, updateReceptionDto, req.user?.id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('IMPRIMIR_RECEPCION')
  @Patch(':id/print')
  registrarImpresion(@Param('id') id: string) {
    return this.receptionService.registrarImpresion(+id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_ACCIONES_MUESTREO')
  @Patch('detalle/:id/estado')
  cambiarEstadoDetalle(@Param('id') id: string, @Body('estado') estado: string, @Request() req) {
    return this.receptionService.cambiarEstadoDetalle(+id, estado, req.user?.id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('ANULAR_RECEPCION')
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.receptionService.remove(+id, req.user?.id);
  }

  // ==========================================
  // RUTAS PARA BÁSCULA
  // ==========================================

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_BASCULA')
  @Get('bascula/pendientes')
  getPendientesBascula() {
    return this.receptionService.getPendientesBascula();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('PESAR_EQUIPO')
  @Put('bascula/entrada/:id')
  registrarPesadaEntrada(@Param('id') id: string, @Body('peso') peso: number, @Body('id_bodega') idBodega: number, @Request() req) {
    return this.receptionService.registrarPesadaEntrada(+id, peso, idBodega, req.user?.id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('CAMBIO_DE_CABEZAL')
  @Put('bascula/cambio-cabezal/salida/:id')
  registrarSalidaCabezal(@Param('id') id: string, @Body('id_placa_saliente') idPlaca: number, @Body('peso_saliente') peso: number, @Request() req) {
    return this.receptionService.registrarSalidaCabezal(+id, idPlaca, peso, req.user?.id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('CAMBIO_DE_CABEZAL')
  @Put('bascula/cambio-cabezal/entrada/:id')
  registrarEntradaCabezal(@Param('id') id: string, @Body('id_placa_entrante') idPlaca: number, @Body('peso_entrante') peso: number, @Request() req) {
    return this.receptionService.registrarEntradaCabezal(+id, idPlaca, peso, req.user?.id);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('PESAR_EQUIPO')
  @Put('bascula/salida/:id')
  registrarPesadaSalida(@Param('id') id: string, @Body('peso') peso: number, @Request() req) {
    return this.receptionService.registrarPesadaSalida(+id, peso, req.user?.id);
  }
}