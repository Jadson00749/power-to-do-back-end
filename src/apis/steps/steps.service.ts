import { StepsEntity } from "../../entity/steps/STEPS.entity"; 
import { HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder  } from 'typeorm';
import { StepsModel } from "models/steps.model";

@Injectable()
export class StepsService {

  constructor(
    @InjectRepository(StepsEntity)
    private stepService: Repository<StepsEntity>
  ){}

  async create(taskId:number, data:StepsModel) {
    let result = this.stepService.create({
      taskId: taskId,
      ...data
    })

    this.stepService.save(result)
  }

  async update(id:number, taskId:number, data:StepsModel) {
    return this.stepService.update(
      { id: id, taskId: taskId },
      { ...data }
    )
  }

  async deleteOne(id:number, taskId:number) {
    return this.stepService.createQueryBuilder()
    .delete().from(StepsEntity)
    .where('id = :id', { id: id })
    .andWhere('taskId = :taskId', { taskId: taskId })
    .execute();
  }

}