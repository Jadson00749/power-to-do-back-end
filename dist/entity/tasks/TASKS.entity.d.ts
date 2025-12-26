import { TasksDetailsEntity } from "./TASK_DETAILS.entity";
import { StepsEntity } from "../../entity/steps/STEPS.entity";
export declare class TasksEntity {
    id: number;
    nameTask: string;
    important: number;
    completed: number;
    concluded: number;
    concludedToday: number;
    concludedTomorrow: number | null;
    selectedTask: number;
    updateTime: Date;
    userId: number;
    categoryId: number;
    descr: string;
    creationDate: Date;
    files: TasksDetailsEntity[];
    steps: StepsEntity[];
}
