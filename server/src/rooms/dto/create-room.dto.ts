import {IsOptional, IsArray, IsEmail, IsPositive, IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  members?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxPersons?: string;
}