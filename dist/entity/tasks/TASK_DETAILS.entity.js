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
exports.TasksDetailsEntity = void 0;
const typeorm_1 = require("typeorm");
const TASKS_entity_1 = require("./TASKS.entity");
let TasksDetailsEntity = class TasksDetailsEntity {
};
exports.TasksDetailsEntity = TasksDetailsEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'ID', type: 'int' }),
    __metadata("design:type", Number)
], TasksDetailsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'TASK_ID', type: 'int' }),
    __metadata("design:type", Number)
], TasksDetailsEntity.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'FILE_NAME', type: 'varchar' }),
    __metadata("design:type", String)
], TasksDetailsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'FILE_SIZE', type: 'int' }),
    __metadata("design:type", Number)
], TasksDetailsEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'FILE_TYPE', type: 'varchar' }),
    __metadata("design:type", String)
], TasksDetailsEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'FILE_CONTENT', type: 'longblob' }),
    __metadata("design:type", Object)
], TasksDetailsEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TASKS_entity_1.TasksEntity, (task) => task.files),
    (0, typeorm_1.JoinColumn)({ name: 'TASK_ID' }),
    __metadata("design:type", TASKS_entity_1.TasksEntity)
], TasksDetailsEntity.prototype, "task", void 0);
exports.TasksDetailsEntity = TasksDetailsEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'TASK_DETAILS' })
], TasksDetailsEntity);
//# sourceMappingURL=TASK_DETAILS.entity.js.map