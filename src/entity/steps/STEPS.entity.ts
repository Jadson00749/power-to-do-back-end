import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { TasksEntity } from "entity/tasks/TASKS.entity"; 

@Entity({ name: 'STEPS' })
export class StepsEntity {
  @PrimaryColumn({ name: 'ID', type: 'int' })
  id: number;

  @Column({ name: 'TASK_ID', type: 'int' })
  taskId:number;

  @Column({ name: 'NOME', type: 'varchar' })
  name:string;

  @Column({ name: 'IS_FINISH', type: 'int' })
  isFinish:number;

  @ManyToOne(() => TasksEntity, (task) => task.steps)
  @JoinColumn({ name: 'TASK_ID' })
  task: StepsEntity;

}