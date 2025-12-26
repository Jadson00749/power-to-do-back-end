import { StepsEntity } from "../../entity/steps/STEPS.entity";
import { Repository } from 'typeorm';
import { StepsModel } from "models/steps.model";
export declare class StepsService {
    private stepService;
    constructor(stepService: Repository<StepsEntity>);
    create(taskId: number, data: StepsModel): Promise<void>;
    update(id: number, taskId: number, data: StepsModel): Promise<import("typeorm").UpdateResult>;
    deleteOne(id: number, taskId: number): Promise<import("typeorm").DeleteResult>;
}
