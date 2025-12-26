import { TasksDetailsEntity } from "entity/tasks/TASK_DETAILS.entity";
import { Repository } from 'typeorm';
import { TaskDetailsModel } from "models/taskDetails.model";
export declare class TaskDetailsService {
    private taskDetailsRepo;
    constructor(taskDetailsRepo: Repository<TasksDetailsEntity>);
    uploadFiles(data: TaskDetailsModel, taskId: number): Promise<TasksDetailsEntity>;
    deleteOne(id: number, taskId: number): Promise<import("typeorm").DeleteResult>;
}
