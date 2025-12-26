import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsIBAN, IsArray } from "class-validator";

export class TaskDetailsModel {
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  taskId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  size: number;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsArray()
  content: Buffer;

}