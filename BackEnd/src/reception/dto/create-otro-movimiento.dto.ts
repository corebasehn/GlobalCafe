import { IsString, IsInt, IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOtroMovimientoDto {
  @IsOptional()
  @IsInt()
  id_sucursal?: number;

  @IsOptional()
  @IsInt()
  id_cosecha?: number;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de vehículo es obligatorio' })
  tipo_vehiculo: string;

  @IsInt({ message: 'La placa del cabezal es obligatoria' })
  id_placa_cabezal: number;

  @IsOptional()
  @IsInt()
  id_placa_furgon?: number;

  @IsInt({ message: 'El conductor es obligatorio' })
  id_conductor: number;

  @IsOptional()
  @IsInt()
  id_municipio?: number;

  @IsOptional()
  @IsInt()
  id_proveedor?: number;

  @IsOptional()
  @IsInt()
  id_tipo_movimiento?: number; // 2 = Casulla

  @IsOptional()
  @IsString()
  remision?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsNumber()
  peso_tara_inicial?: number; // Permite registrar de una vez la 1ra pesada si el camión ya está en la báscula
}
