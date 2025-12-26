"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDetailsService = void 0;
const TASK_DETAILS_entity_1 = require("../../entity/tasks/TASK_DETAILS.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TaskDetailsService = class TaskDetailsService {
    constructor(taskDetailsRepo) {
        this.taskDetailsRepo = taskDetailsRepo;
    }
    async uploadFiles(data, taskId) {
        try {
            const buffer = Buffer.from(data?.content);
            let queryUpload = this.taskDetailsRepo.create({
                taskId: taskId,
                name: data?.name,
                size: data?.size,
                type: data?.type,
                content: buffer
            });
            return await this.taskDetailsRepo.save(queryUpload);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error registering file');
        }
    }
    async deleteOne(id, taskId) {
        return this.taskDetailsRepo.createQueryBuilder()
            .delete().from(TASK_DETAILS_entity_1.TasksDetailsEntity)
            .where('id = :id', { id: id })
            .andWhere('taskId = :taskId', { taskId: taskId })
            .execute();
    }
};
exports.TaskDetailsService = TaskDetailsService;
exports.TaskDetailsService = TaskDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(TASK_DETAILS_entity_1.TasksDetailsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskDetailsService);
//# sourceMappingURL=tasksDetails.service.js.map