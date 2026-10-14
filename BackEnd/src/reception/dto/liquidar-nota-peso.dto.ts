import { IsNumber, IsOptional, IsString } from 'class-validator';

export class LiquidarNotaPesoDto {
  @IsOptional()
  @IsNumber()
  humedad?: number;

  @IsOptional()
  @IsNumber()
  dano?: number;

  @IsOptional()
  @IsNumber()
  otros_descuentos?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
