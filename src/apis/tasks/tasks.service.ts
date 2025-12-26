import { TasksEntity } from "entity/tasks/TASKS.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder  } from 'typeorm';
import { TaskModel } from 'models/tasks.model';
import { Cron } from "@nestjs/schedule";
@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TasksEntity)
    private tasksRepo: Repository<TasksEntity>
  ) {} 

  @Cron('*/20 * * * *')
  async moveExpiredTasks(){
    const tasks = await this.tasksRepo.createQueryBuilder('r')
    .where('r.categoryId = :categoryId', { categoryId: 1 })
    .andWhere('r.creationDate < NOW() - INTERVAL 1 DAY')
    .getMany();

    for(let tasksToUpdate of tasks) {
      tasksToUpdate.categoryId = 0;
      await this.tasksRepo.save(tasksToUpdate)
    }
  }

  async findByFilters(page:number, length:number,userId:number,categoryId:number) {

    const skip = (page - 1) * length;

    let query:SelectQueryBuilder<TasksEntity> = this.tasksRepo.createQueryBuilder('r')
    .leftJoinAndSelect('r.files', 'd')
    .leftJoinAndSelect('r.steps', 's')
    .where('r.userId = :userId', { userId: userId })
    .orderBy('r.id', 'DESC');
    
    if(page && length) query.skip(skip).take(length)
    if(categoryId) query.andWhere('r.categoryId = :categoryId', { categoryId: categoryId })

    const [ result, count ] = await query.getManyAndCount();

    const sortedResult = result.sort((a, b) => {
      if (a.important && !b.important) {
        return -1;
      } else if (!a.important && b.important) {
        return 1; 
      } else {
        return 0;
      }
    }).map((item) => {
      if(item?.files && item?.files.length > 0) {
        item.files = item.files.map(details => {
          if(details?.content) {
            details.content = Buffer.from(details?.content).toString('base64')
          }
          return details
        })
      }
      return item
    })

    return { rows: sortedResult, count }

  }

  async createTask(data:TaskModel,userId:number,categoryId:number) {

    let createQuery = this.tasksRepo.create(
      {
        userId: userId,
        categoryId: categoryId,
        ...data
    })

    return await this.tasksRepo.save(createQuery)

  }

  async deleteOne(id:number,userId:number,categoryId:number) {
    return this.tasksRepo.createQueryBuilder()
    .delete().from(TasksEntity)
    .where('id = :id', { id: id })
    .andWhere('categoryId = :categoryId', { categoryId: categoryId })
    .andWhere('userId = :userId', { userId: userId })
    .execute();
  }

  async update(data:TaskModel,id:number,userId:number,categoryId:number) {

    return this.tasksRepo.update(
      { id: id, userId: userId, categoryId: categoryId },
      {
        ...data
      }
    )
  }

}