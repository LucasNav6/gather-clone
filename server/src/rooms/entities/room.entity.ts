// rooms/entities/room.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { RoomMember } from './room-member.entity';
import { Map } from './map.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Column({ type: 'uuid' })
  ownerUuid: string;

  @Column({ type: 'varchar', length: 180 })
  name: string;

  @OneToMany(() => RoomMember, (member) => member.room, { cascade: true })
  members: RoomMember[];

  @OneToMany(() => Map, (map) => map.room, { cascade: true })
  maps: Map[];

  @Index()
  @Column({ type: 'uuid', nullable: true })
  defaultMapUuid?: string;
}
