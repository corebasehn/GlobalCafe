import { Body, Controller, Get, Param, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from './auth.guard';
import { PermissionsGuard } from './permissions.guard';
import { RequirePermissions } from './permissions.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_USUARIOS')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_USUARIOS') // O crear uno específico para crear usuarios si existe
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.usersService.create(createUserDto, req.user);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_USUARIOS')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(+id, updateUserDto, req.user);
  }

  @UseGuards(AuthGuard, PermissionsGuard)
  @RequirePermissions('VER_USUARIOS')
  @Patch(':id/status')
  toggleStatus(@Param('id') id: string, @Request() req) {
    return this.usersService.remove(+id, req.user);
  }
}