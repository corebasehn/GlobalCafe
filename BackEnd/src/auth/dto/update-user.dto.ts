import { IsString, IsEmail, IsOptional, MinLength, IsBoolean, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  usuario?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @ValidateIf(o => o.email !== '' && o.email !== undefined)
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsOptional()
  email?: string;

  @ValidateIf(o => o.password !== '' && o.password !== undefined)
  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsOptional()
  password?: string;

  @ValidateIf(o => o.rol !== '' && o.rol !== undefined)
  @IsString()
  @IsOptional()
  rol?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
