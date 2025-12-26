import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { TasksEntity } from "./TASKS.entity";

@Entity({ name: 'TASK_DETAILS' })
export class TasksDetailsEntity {

  @PrimaryColumn({ name: 'ID', type: 'int' })
  id: number

  @Column({ name: 'TASK_ID', type: 'int' })
  taskId:number

  @Column({ name: 'FILE_NAME', type: 'varchar' })
  name:string

  @Column({ name: 'FILE_SIZE', type: 'int' })
  size:number

  @Column({ name: 'FILE_TYPE', type: 'varchar' })
  type:string

  @Column({ name: 'FILE_CONTENT', type: 'bytea' })
  content:Buffer | string

  @ManyToOne(() => TasksEntity, (task) => task.files)
  @JoinColumn({ name: 'TASK_ID' })
  task: TasksEntity;

}