import { Body, Controller, HttpStatus, Param, Post, Get, Res, Put, Delete, UseGuards, HttpException, Req } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags, ApiHeader, ApiParam, ApiBody } from '@nestjs/swagger';
import { HeaderReq } from 'decorators/httpHeaders/default.decorators'; 
import { TasksService } from './tasks.service';
import { TaskDetailsModel } from "models/taskDetails.model";
import { ApiLengthParam, ApiPageParam } from '../../decorators/swegger/customSwegger.decorator';
import { TaskModel } from 'models/tasks.model';
import { JwtAuthGuard } from 'guards/JwtAuthGuard'; 
import { jwtDecode } from 'common/jwt';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly TaskService: TasksService) {}

  @Post('findAllOrFilters/:page/:length')
  @ApiHeader({ name: 'categoryId', required: false, example: 1 })
  @ApiBody({ type: TaskModel })
  @ApiLengthParam(false)
  @ApiPageParam(false)
  async findAllOrfilters(
    @Param() params: any,
    @Res() res: Response,
    @Req() req: Request,
    @HeaderReq('categoryId', false) categoryId?:number
  ) {
    const idUser = jwtDecode(req)['userId'];
   
    let { rows, count } = await this.TaskService.findByFilters(Number(params.page), Number(params.length),Number(idUser),Number(categoryId));

    if (!count) rows = [];

    res.setHeader('length', count.toString());
    res.setHeader('Access-Control-Expose-Headers', 'length');

    return res.status(HttpStatus.OK).json(rows);
  }

  @Post('create')
  @ApiHeader({ name: 'categoryId', required: true, example: 1 })
  async create (
    @Body() data:TaskModel, 
    @Res() res: Response,
    @Req() req: Request,
    @HeaderReq('categoryId') categoryId:number
  ) {
    const idUser = jwtDecode(req)['userId'];

    let rows = await this.TaskService.createTask(data,Number(idUser),Number(categoryId))

    return res.status(HttpStatus.CREATED).json(rows)
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiHeader({ name: 'categoryId', required: true, example: 1 })
  async delete(
    @Param('id') id:number,
    @Res() res: Response,
    @Req() req: Request,
    @HeaderReq('categoryId') categoryId:number
  ) {
    const idUser = jwtDecode(req)['userId'];

    let result = await this.TaskService.deleteOne(Number(id),Number(idUser),Number(categoryId));
   
    if (result.affected > 0) {
      res.json({ message: 'Registro deletado com sucesso' });
    } else {
      throw new HttpException('Nenhum registro foi afetado. Verifique se o item existe e tente novamente.',HttpStatus.BAD_REQUEST);
    }
    return result;
    }

    @Put('/update/:id')
    @ApiParam({ name: 'id', required: true })
    @ApiHeader({ name: 'categoryId', required: true, example: 1 })
    async update(
      @Body() data: TaskModel, 
      @Param() params, 
      @Res() res: Response,
      @Req() req: Request,
      @HeaderReq('categoryId') categoryId:number) {
      
      const userId = jwtDecode(req)['userId'];

       let result = await this.TaskService.update(data,Number(params?.id),Number(userId),Number(categoryId))

      if(result.affected) return res.status(HttpStatus.OK).json('Registration Updated Successfully!')
      return res.status(HttpStatus.OK).json({ message: 'Nenhum registro foi efetado' })
    }

}