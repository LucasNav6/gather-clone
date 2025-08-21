import { IsUUID } from 'class-validator';

export class InviteMemberDto {
  @IsUUID()
  roomUuid: string;

  @IsUUID()
  userUuid: string;
}