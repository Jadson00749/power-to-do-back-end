import { TasksEntity } from "./tasks/TASKS.entity";
import { UsersEntity } from 'entity/user/USERS';
import { TasksDetailsEntity } from "./tasks/TASK_DETAILS.entity"; 
import { StepsEntity } from "../entity/steps/STEPS.entity"; 

export const taskEntity = [
  TasksEntity,
  UsersEntity,
  TasksDetailsEntity,
  StepsEntity
];
