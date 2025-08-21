// rooms/rooms.service.ts
import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { RoomMember, InvitationStatus } from './entities/room-member.entity';
import { Map } from './entities/map.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InviteMemberDto } from './dto/invite-member.dto';

@Injectable()
export class RoomsService {
  private readonly logger = new Logger(RoomsService.name);

  constructor(
    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
    @InjectRepository(RoomMember)
    private readonly memberRepo: Repository<RoomMember>,
    @InjectRepository(Map)
    private readonly mapRepo: Repository<Map>,
  ) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    const room = this.roomRepo.create({ name: dto.name, ownerUuid: dto.ownerUuid });
    const savedRoom = await this.roomRepo.save(room);

    // agregar miembros si existen
    if (dto.members?.length) {
      const members = dto.members.map((u) =>
        this.memberRepo.create({ room: savedRoom, userUuid: u }),
      );
      await this.memberRepo.save(members);
    }

    this.logger.log(`Room creado: ${savedRoom._uuid}`);
    return savedRoom;
  }

  findAll(): Promise<Room[]> {
    return this.roomRepo.find({ relations: ['members', 'maps'] });
  }

  async findOne(_uuid: string): Promise<Room> {
    const room = await this.roomRepo.findOne({ where: { _uuid }, relations: ['members', 'maps'] });
    if (!room) throw new NotFoundException('Room no encontrada');
    return room;
  }

  async update(dto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(dto._uuid);
    if (dto.name) room.name = dto.name;
    if (dto.newOwnerUuid) room.ownerUuid = dto.newOwnerUuid;

    if (dto.addMembers?.length) {
      const newMembers = dto.addMembers.map((u) => this.memberRepo.create({ room, userUuid: u }));
      await this.memberRepo.save(newMembers);
    }

    // if (dto.removeMembers?.length) {
    //   await this.memberRepo.softDelete({
    //     room: { _uuid: dto._uuid } as any,
    //     userUuid: dto.removeMembers,
    //   });
    // }

    return this.roomRepo.save(room);
  }

  async remove(_uuid: string) {
    const room = await this.findOne(_uuid);
    await this.roomRepo.remove(room);
    return { ok: true };
  }

  async inviteMember(dto: InviteMemberDto) {
    const room = await this.findOne(dto.roomUuid);
    const member = this.memberRepo.create({ room, userUuid: dto.userUuid, status: InvitationStatus.PENDING });
    return this.memberRepo.save(member);
  }
}
