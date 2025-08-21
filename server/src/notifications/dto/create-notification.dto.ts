import { IsString, IsOptional, IsUUID, IsObject } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  recipientUuid: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsObject()
  data?: string;

  @IsOptional()
  @IsUUID()
  senderUuid?: string;
}
