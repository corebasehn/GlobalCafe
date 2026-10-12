import { Global, Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from '../prisma.service';

@Global() // Permite que NotificationsGateway y NotificationsService sean inyectables globalmente
@Module({
  controllers: [NotificationsController],
  providers: [NotificationsGateway, NotificationsService, PrismaService],
  exports: [NotificationsGateway, NotificationsService],
})
export class NotificationsModule {}