import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsOptional } from "class-validator";

export class StepsModel {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id:number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  taskId:number;

  @ApiProperty()
  @IsString()
  name:string;

  @ApiProperty()
  @IsNumber()
  isFinish:number;

}