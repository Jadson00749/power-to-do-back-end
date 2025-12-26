import { Body, Controller, HttpStatus, Param, Post, Get, Res, Put, Delete, UseGuards, HttpException, Req } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags, ApiHeader, ApiParam, ApiBody } from '@nestjs/swagger';
import { HeaderReq } from 'decorators/httpHeaders/default.decorators'; 
import { StepsService } from './steps.service'; 
import { StepsModel } from "models/steps.model";
import { JwtAuthGuard } from 'guards/JwtAuthGuard'; 

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('steps')
@Controller('/steps')
export class StepsController {
  constructor(
    private readonly stepController: StepsService
  ){}

  @Post('create')
  @ApiHeader({ name: 'taskId', required: true, example: 1 })
  async create (
    @Body() data:StepsModel, 
    @Res() res: Response,
    @HeaderReq('taskId') taskId:number
  ) {

    let rows = await this.stepController.create(Number(taskId),data)

    return res.status(HttpStatus.CREATED).json(rows)
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiHeader({ name: 'taskId', required: true, example: 1 })
  async delete(
    @Param('id') id:number,
    @Res() res: Response,
    @HeaderReq('taskId') taskId:number
  ) {

    let result = await this.stepController.deleteOne(Number(id),Number(taskId));
   
    if (result.affected > 0) {
      res.json({ message: 'Registro deletado com sucesso' });
    } else {
      throw new HttpException('Nenhum registro foi afetado. Verifique se o item existe e tente novamente.',HttpStatus.BAD_REQUEST);
    }
    return result;
    }

    @Put('/update/:id')
    @ApiParam({ name: 'id', required: true })
    @ApiHeader({ name: 'taskId', required: true, example: 1 })
    async update(
      @Body() data: StepsModel, 
      @Param('id') id, 
      @Res() res: Response,
      @HeaderReq('taskId') taskId:number) {
      
       let result = await this.stepController.update(Number(id),Number(taskId),data)

      if(result.affected) return res.status(HttpStatus.OK).json('Registration Updated Successfully!')
      return res.status(HttpStatus.OK).json({ message: 'Nenhum registro foi efetado' })
    }

}