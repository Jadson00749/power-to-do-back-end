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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksEntity = void 0;
const typeorm_1 = require("typeorm");
const TASK_DETAILS_entity_1 = require("./TASK_DETAILS.entity");
const STEPS_entity_1 = require("../../entity/steps/STEPS.entity");
let TasksEntity = class TasksEntity {
};
exports.TasksEntity = TasksEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'ID', type: 'int' }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NAMETASK', type: 'varchar' }),
    __metadata("design:type", String)
], TasksEntity.prototype, "nameTask", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IMPORTANT', type: 'int' }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "important", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'COMPLETED', type: 'int' }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CONCLUDED', type: 'int' }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "concluded", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CONCLUDEDTODAY', type: 'int' }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "concludedToday", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CONCLUDEDTOMORROW', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "concludedTomorrow", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'SELECTEDTASK', type: 'int' }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "selectedTask", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'UPDATETIME', type: 'timestamp' }),
    __metadata("design:type", Date)
], TasksEntity.prototype, "updateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'USER_ID', type: 'int' }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'CATEGORY_ID', type: 'int' }),
    __metadata("design:type", Number)
], TasksEntity.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'DESCR', type: 'varchar' }),
    __metadata("design:type", String)
], TasksEntity.prototype, "descr", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TASK_CREATION', type: 'timestamp' }),
    __metadata("design:type", Date)
], TasksEntity.prototype, "creationDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TASK_DETAILS_entity_1.TasksDetailsEntity, (files) => files.task),
    __metadata("design:type", Array)
], TasksEntity.prototype, "files", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => STEPS_entity_1.StepsEntity, (files) => files.task),
    __metadata("design:type", Array)
], TasksEntity.prototype, "steps", void 0);
exports.TasksEntity = TasksEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'TASKS' })
], TasksEntity);
//# sourceMappingURL=TASKS.entity.js.map