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
exports.TasksService = void 0;
const TASKS_entity_1 = require("../../entity/tasks/TASKS.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
let TasksService = class TasksService {
    constructor(tasksRepo) {
        this.tasksRepo = tasksRepo;
    }
    async moveExpiredTasks() {
        const tasks = await this.tasksRepo.createQueryBuilder('r')
            .where('r.categoryId = :categoryId', { categoryId: 1 })
            .andWhere('r.creationDate < NOW() - INTERVAL 1 DAY')
            .getMany();
        for (let tasksToUpdate of tasks) {
            tasksToUpdate.categoryId = 0;
            await this.tasksRepo.save(tasksToUpdate);
        }
    }
    async findByFilters(page, length, userId, categoryId) {
        const skip = (page - 1) * length;
        let query = this.tasksRepo.createQueryBuilder('r')
            .leftJoinAndSelect('r.files', 'd')
            .leftJoinAndSelect('r.steps', 's')
            .where('r.userId = :userId', { userId: userId })
            .orderBy('r.id', 'DESC');
        if (page && length)
            query.skip(skip).take(length);
        if (categoryId)
            query.andWhere('r.categoryId = :categoryId', { categoryId: categoryId });
        const [result, count] = await query.getManyAndCount();
        const sortedResult = result.sort((a, b) => {
            if (a.important && !b.important) {
                return -1;
            }
            else if (!a.important && b.important) {
                return 1;
            }
            else {
                return 0;
            }
        }).map((item) => {
            if (item?.files && item?.files.length > 0) {
                item.files = item.files.map(details => {
                    if (details?.content) {
                        details.content = Buffer.from(details?.content).toString('base64');
                    }
                    return details;
                });
            }
            return item;
        });
        return { rows: sortedResult, count };
    }
    async createTask(data, userId, categoryId) {
        let createQuery = this.tasksRepo.create({
            userId: userId,
            categoryId: categoryId,
            ...data
        });
        return await this.tasksRepo.save(createQuery);
    }
    async deleteOne(id, userId, categoryId) {
        return this.tasksRepo.createQueryBuilder()
            .delete().from(TASKS_entity_1.TasksEntity)
            .where('id = :id', { id: id })
            .andWhere('categoryId = :categoryId', { categoryId: categoryId })
            .andWhere('userId = :userId', { userId: userId })
            .execute();
    }
    async update(data, id, userId, categoryId) {
        return this.tasksRepo.update({ id: id, userId: userId, categoryId: categoryId }, {
            ...data
        });
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)('*/20 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "moveExpiredTasks", null);
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(TASKS_entity_1.TasksEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map