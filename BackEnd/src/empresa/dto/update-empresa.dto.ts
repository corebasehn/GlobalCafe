import { IsString, IsOptional, IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmpresaDto {
  @ApiProperty({ example: 'Global Café S.A.' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  nombre?: string;

  @ApiProperty({ example: 'Global Café Sociedad Anónima' })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  razon_social?: string;

  @ApiProperty({ example: '08011990123456' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  rtn?: string;

  @ApiProperty({ example: 'REG-SAN-12345' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  registro_sanitario?: string;

  @ApiProperty({ example: 'Colonia Las Lomas, Tegucigalpa' })
  @IsString()
  @IsOptional()
  @MaxLength(250)
  direccion?: string;

  @ApiProperty({ example: '+504 2233-4455' })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  telefono?: string;

  @ApiProperty({ example: '+504 2233-4466' })
  @IsString()
  @IsOptional()
  @MaxLength(30)
  telefono_secundario?: string;

  @ApiProperty({ example: 'contacto@globalcafe.hn' })
  @IsEmail()
  @IsOptional()
  @MaxLength(150)
  correo?: string;

  @ApiProperty({ example: 'Honduras' })
  @IsString()
  @IsOptional()
  @MaxLength(80)
  pais?: string;

  @ApiProperty({ example: 'Tegucigalpa' })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  ciudad?: string;

  @ApiProperty({ example: 'https://globalcafe.hn' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  sitio_web?: string;

  @ApiProperty({ example: 'El mejor café de la región' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  eslogan?: string;
}

