import { Body, Controller, HttpStatus, Param, Post, Get, Res, Put, Delete, UseGuards, HttpException, Req, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags, ApiHeader, ApiParam, ApiBody } from '@nestjs/swagger';
import { HeaderReq } from 'decorators/httpHeaders/default.decorators'; 
import { TaskDetailsService } from './tasksDetails.service'; 
import { TaskDetailsModel } from "models/taskDetails.model";
import { JwtAuthGuard } from 'guards/JwtAuthGuard'; 

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
export class TaskDetailsController {
  constructor(private readonly TaskDetService: TaskDetailsService) {}

    @Post('/upload/files')
    @ApiHeader({ name: 'taskId', required: true, example: 1 })
    async uploadFiles(
      @Body() data: TaskDetailsModel,
      @Res() res: Response,
      @HeaderReq('taskId') taskId:number
    ){
      try {
        
        let result = this.TaskDetService.uploadFiles(data,Number(taskId))

        return res.status(HttpStatus.CREATED).json(result)
        
      } catch (error) {
        if(error instanceof BadRequestException) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            message: error?.message
          })
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erro ao cadastrar arquivo'
        })
      }

    }

    @Delete('/upload/delete/:id')
    @ApiHeader({ name: 'taskId', required: true, example: 1 })
    @ApiParam({ name: 'id', required: true, type: Number })
    async deleteOneUpload(
      @Param('id') id:number, 
      @HeaderReq('taskId') taskId:number,
      @Res() res: Response)
      {
        let result = await this.TaskDetService.deleteOne(Number(id),Number(taskId))

        if (result.affected > 0) {
          res.json({ message: 'Registro deletado com sucesso' });
        } else {
          throw new HttpException('Nenhum registro foi afetado. Verifique se o item existe e tente novamente.',HttpStatus.BAD_REQUEST);
        }
        return result;
    }

}