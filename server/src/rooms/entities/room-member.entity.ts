import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Room } from './room.entity';

export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

@Entity('room_members')
export class RoomMember {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Index()
  @Column({ type: 'uuid' })
  userUuid: string;

  @ManyToOne(() => Room, (room) => room.members, { onDelete: 'CASCADE' })
  room: Room;

  @Column({ type: 'enum', enum: InvitationStatus, default: InvitationStatus.PENDING })
  status: InvitationStatus;
}
