import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Room } from './room.entity';

@Entity('maps')
export class Map {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Column({ type: 'int' })
  sizeX: number;

  @Column({ type: 'int' })
  sizeY: number;

  @ManyToOne(() => Room, (room) => room.maps, { onDelete: 'CASCADE' })
  room: Room;
}
