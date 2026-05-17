import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ValidateIf(o => o.email !== '' && o.email !== undefined)
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsNotEmpty()
  password: string;

  @ValidateIf(o => o.rol !== '' && o.rol !== undefined)
  @IsString()
  @IsOptional()
  rol?: string; // El frontend envía "rol" como string (ej: "ADMIN")
}
