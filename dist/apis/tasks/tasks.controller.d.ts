import { Response } from 'express';
import { TasksService } from './tasks.service';
import { TaskModel } from 'models/tasks.model';
export declare class TasksController {
    private readonly TaskService;
    constructor(TaskService: TasksService);
    findAllOrfilters(params: any, res: Response, req: Request, categoryId?: number): Promise<Response<any, Record<string, any>>>;
    create(data: TaskModel, res: Response, req: Request, categoryId: number): Promise<Response<any, Record<string, any>>>;
    delete(id: number, res: Response, req: Request, categoryId: number): Promise<import("typeorm").DeleteResult>;
    update(data: TaskModel, params: any, res: Response, req: Request, categoryId: number): Promise<Response<any, Record<string, any>>>;
}
