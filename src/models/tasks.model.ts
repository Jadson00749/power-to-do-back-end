import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsOptional } from "class-validator";
import { IsNull } from 'typeorm';

export class TaskModel {
  @IsOptional()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  nameTask: string;

  @ApiProperty()
  @IsNumber()
  important: number;

  @ApiProperty()
  @IsNumber()
  completed: number;

  @ApiProperty()
  @IsNumber()
  concluded: number;

  @ApiProperty()
  @IsNumber()
  concludedToday: number;

  @ApiProperty()
  @IsNumber()
  concludedTomorrow: number;

  @ApiProperty()
  @IsNumber()
  selectedTask: number;

  @IsOptional()
  @ApiProperty()
  @IsString()
  updateTime: string;

  @IsOptional()
  @IsNumber()
  userId:number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  descr: string;

  @IsOptional()
  @IsNumber()
  categoryId:number

}