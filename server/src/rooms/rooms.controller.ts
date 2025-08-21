// rooms/rooms.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InviteMemberDto } from './dto/invite-member.dto';
import { AuthentificationGuard } from 'src/authentification/authentification.guard';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
@UseGuards(AuthentificationGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() dto: CreateRoomDto) {
    return this.roomsService.create(dto);
  }

  @Get()
  async findAll() {
    return {rooms: await this.roomsService.findAll()};
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return {uuid: uuid, room: this.roomsService.findOne(uuid)};
  }

  @Patch()
  update(@Body() dto: UpdateRoomDto) {
    return this.roomsService.update(dto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.roomsService.remove(uuid);
  }

  @Post('invite')
  invite(@Body() dto: InviteMemberDto) {
    return this.roomsService.inviteMember(dto);
  }
}
