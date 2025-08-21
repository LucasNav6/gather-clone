import { IsUUID, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsUUID()
  _uuid: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  addMembers?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  removeMembers?: string[];

  @IsOptional()
  @IsUUID()
  newOwnerUuid?: string;

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
