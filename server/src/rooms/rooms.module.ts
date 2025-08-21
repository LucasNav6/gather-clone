import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Map } from './entities/map.entity';
import { RoomMember } from './entities/room-member.entity';
import { Room } from './entities/room.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthentificationModule } from 'src/authentification/authentification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Map, RoomMember, Room]),
    ConfigModule,
    AuthentificationModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule { }
