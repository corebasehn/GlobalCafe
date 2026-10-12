import { IsString, IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsOptional()
  @IsString()
  rol_destino?: string;

  @IsOptional()
  @IsInt()
  usuario_id?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  icono?: string;

  @IsOptional()
  @IsString()
  referencia_id?: string;

  @IsOptional()
  @IsString()
  ruta?: string;
}
