import { Module } from '@nestjs/common';
import { ReceptionService } from './reception.service'; 
import { ReceptionController } from './reception.controller';
import { NotaPesoService } from './nota-peso.service';
import { NotaPesoController } from './nota-peso.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ReceptionController, NotaPesoController],
  providers: [ReceptionService, NotaPesoService, PrismaService],
})
export class ReceptionModule {}