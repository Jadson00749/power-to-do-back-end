import { TasksDetailsEntity } from "entity/tasks/TASK_DETAILS.entity";
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder  } from 'typeorm';
import { TaskDetailsModel } from "models/taskDetails.model";

@Injectable()
export class TaskDetailsService {

  constructor(
    @InjectRepository(TasksDetailsEntity)
    private taskDetailsRepo: Repository<TasksDetailsEntity>
  ) {} 

  
  async uploadFiles(data:TaskDetailsModel,taskId:number) {
    try{
      const buffer = Buffer.from(data?.content)

      let queryUpload = this.taskDetailsRepo.create({
        taskId: taskId,
        name: data?.name,
        size: data?.size,
        type: data?.type,
        content: buffer
      })
      return await this.taskDetailsRepo.save(queryUpload)
    }catch(error){
      throw new InternalServerErrorException('Error registering file');
    }
 
  }

  async deleteOne(id:number,taskId:number){
    return this.taskDetailsRepo.createQueryBuilder()
    .delete().from(TasksDetailsEntity)
    .where('id = :id', { id: id })
    .andWhere('taskId = :taskId', { taskId: taskId })
    .execute();
  }
  
}