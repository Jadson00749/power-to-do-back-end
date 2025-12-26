import { TasksEntity } from "./TASKS.entity";
export declare class TasksDetailsEntity {
    id: number;
    taskId: number;
    name: string;
    size: number;
    type: string;
    content: Buffer | string;
    task: TasksEntity;
}
