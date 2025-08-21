import { IsString, IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateRoomDto {
  @IsUUID()
  ownerUuid: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  members?: string[];

  @IsOptional()
  @IsUUID()
  defaultMapUuid?: string;
}