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
exports.StepsEntity = void 0;
const typeorm_1 = require("typeorm");
const TASKS_entity_1 = require("../tasks/TASKS.entity");
let StepsEntity = class StepsEntity {
};
exports.StepsEntity = StepsEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'ID', type: 'int' }),
    __metadata("design:type", Number)
], StepsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TASK_ID', type: 'int' }),
    __metadata("design:type", Number)
], StepsEntity.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'NOME', type: 'varchar' }),
    __metadata("design:type", String)
], StepsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'IS_FINISH', type: 'int' }),
    __metadata("design:type", Number)
], StepsEntity.prototype, "isFinish", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TASKS_entity_1.TasksEntity, (task) => task.steps),
    (0, typeorm_1.JoinColumn)({ name: 'TASK_ID' }),
    __metadata("design:type", StepsEntity)
], StepsEntity.prototype, "task", void 0);
exports.StepsEntity = StepsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'STEPS' })
], StepsEntity);
//# sourceMappingURL=STEPS.entity.js.map