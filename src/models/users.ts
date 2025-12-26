import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from "class-validator";

export class UsersModel {
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  name: string;

  @IsOptional()
  @ApiProperty()
  @IsString()
  creationDate: string;

}