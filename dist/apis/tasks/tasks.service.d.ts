import { TasksEntity } from "entity/tasks/TASKS.entity";
import { Repository } from 'typeorm';
import { TaskModel } from 'models/tasks.model';
export declare class TasksService {
    private tasksRepo;
    constructor(tasksRepo: Repository<TasksEntity>);
    moveExpiredTasks(): Promise<void>;
    findByFilters(page: number, length: number, userId: number, categoryId: number): Promise<{
        rows: TasksEntity[];
        count: number;
    }>;
    createTask(data: TaskModel, userId: number, categoryId: number): Promise<TasksEntity>;
    deleteOne(id: number, userId: number, categoryId: number): Promise<import("typeorm").DeleteResult>;
    update(data: TaskModel, id: number, userId: number, categoryId: number): Promise<import("typeorm").UpdateResult>;
}
