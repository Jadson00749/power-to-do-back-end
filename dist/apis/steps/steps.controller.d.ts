import { Response } from 'express';
import { StepsService } from './steps.service';
import { StepsModel } from "models/steps.model";
export declare class StepsController {
    private readonly stepController;
    constructor(stepController: StepsService);
    create(data: StepsModel, res: Response, taskId: number): Promise<Response<any, Record<string, any>>>;
    delete(id: number, res: Response, taskId: number): Promise<import("typeorm").DeleteResult>;
    update(data: StepsModel, id: any, res: Response, taskId: number): Promise<Response<any, Record<string, any>>>;
}
