import { TasksEntity } from "./tasks/TASKS.entity";
import { UsersEntity } from 'entity/user/USERS';
import { TasksDetailsEntity } from "./tasks/TASK_DETAILS.entity";
import { StepsEntity } from "../entity/steps/STEPS.entity";
export declare const taskEntity: (typeof TasksDetailsEntity | typeof TasksEntity | typeof StepsEntity | typeof UsersEntity)[];
