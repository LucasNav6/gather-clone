import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthentificationModule } from 'src/authentification/authentification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    ConfigModule,
    AuthentificationModule
  ],
  providers: [NotificationsGateway, NotificationsService],
})
export class NotificationsModule { }
