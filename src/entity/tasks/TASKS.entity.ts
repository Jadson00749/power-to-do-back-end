import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from "typeorm";
import { TasksDetailsEntity } from "./TASK_DETAILS.entity";
import { StepsEntity } from "../../entity/steps/STEPS.entity"; 
@Entity({ name: 'TASKS' })
export class TasksEntity {

  @PrimaryColumn({ name: 'ID', type: 'int' })
  id: number

  @Column({ name: 'NAMETASK', type: 'varchar' })
  nameTask:string

  @Column({ name: 'IMPORTANT', type: 'int' })
  important:number

  @Column({ name: 'COMPLETED', type: 'int' })
  completed:number

  @Column({ name: 'CONCLUDED', type: 'int' })
  concluded:number

  @Column({ name: 'CONCLUDEDTODAY', type: 'int' })
  concludedToday:number

  @Column({ name: 'CONCLUDEDTOMORROW', type: 'int', nullable: true })
  concludedTomorrow:number | null

  @Column({ name: 'SELECTEDTASK', type: 'int' })
  selectedTask:number

  @Column({ name: 'UPDATETIME', type: 'timestamp' })
  updateTime:Date

  @Column({ name: 'USER_ID', type: 'int' })
  userId:number

  @Column({ name: 'CATEGORY_ID', type: 'int' })
  categoryId:number

  @Column({ name: 'DESCR', type: 'varchar' })
  descr:string;

  @Column({ name: 'TASK_CREATION', type: 'timestamp' })
  creationDate:Date;

  @OneToMany(()=> TasksDetailsEntity, (files) => files.task)
  files:TasksDetailsEntity[]

  @OneToMany(()=> StepsEntity, (files) => files.task)
  steps: StepsEntity[]
}