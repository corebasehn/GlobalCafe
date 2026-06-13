import { IsString, IsInt, IsNumber, IsOptional, IsArray, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReceptionDetalleDto {
  @IsOptional() 
  @IsInt() 
  id_detalle_recepcion?: number;

  @IsInt() 
  @IsNotEmpty()
  id_proveedor: number;

  @IsInt() 
  @IsNotEmpty()
  cantidad_sacos: number;

  @IsNumber() 
  @IsNotEmpty()
  cantidad_qq: number;

  @IsString()
  @IsNotEmpty()
  remision: string;

  @IsOptional()
  @IsInt()
  id_tipo_remision?: number;

  @IsOptional()
  @IsInt()
  id_tipo_cafe?: number;

  @IsOptional()
  @IsInt()
  id_tipo_empaque?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}

export class CreateReceptionDto {
  @IsOptional() 
  @IsInt() 
  id_sucursal?: number;

  @IsInt() 
  @IsNotEmpty()
  id_cosecha: number;

  @IsString() 
  @IsNotEmpty()
  tipo_vehiculo: string;

  @IsInt() 
  @IsNotEmpty()
  id_placa_cabezal: number;

  @IsOptional() 
  @IsInt() 
  id_placa_furgon?: number;

  @IsInt() 
  @IsNotEmpty()
  id_conductor: number;

  @IsInt() 
  @IsNotEmpty()
  id_municipio: number;

  @IsOptional() 
  @IsString() 
  marchamo?: string;

  @IsOptional() 
  @IsString() 
  observaciones?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReceptionDetalleDto)
  detalles: CreateReceptionDetalleDto[];
}