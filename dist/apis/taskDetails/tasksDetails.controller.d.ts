import { Response } from 'express';
import { TaskDetailsService } from './tasksDetails.service';
import { TaskDetailsModel } from "models/taskDetails.model";
export declare class TaskDetailsController {
    private readonly TaskDetService;
    constructor(TaskDetService: TaskDetailsService);
    uploadFiles(data: TaskDetailsModel, res: Response, taskId: number): Promise<Response<any, Record<string, any>>>;
    deleteOneUpload(id: number, taskId: number, res: Response): Promise<import("typeorm").DeleteResult>;
}
