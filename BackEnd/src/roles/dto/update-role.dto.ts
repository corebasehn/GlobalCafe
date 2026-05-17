import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  // Puedes añadir campos extra específicos de actualización si los necesitas
  @IsBoolean()
  @IsOptional()
  estado?: boolean;
}