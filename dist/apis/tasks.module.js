"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_index_1 = require("../entity/tasks.index");
const tasks_service_1 = require("./tasks/tasks.service");
const tasks_controller_1 = require("./tasks/tasks.controller");
const tasksDetails_service_1 = require("./taskDetails/tasksDetails.service");
const tasksDetails_controller_1 = require("./taskDetails/tasksDetails.controller");
const loginUser_controller_1 = require("./login/loginUser.controller");
const loginUser_service_1 = require("./login/loginUser.service");
const jwt_1 = require("@nestjs/jwt");
const steps_service_1 = require("./steps/steps.service");
const steps_controller_1 = require("./steps/steps.controller");
let TasksModule = class TasksModule {
};
exports.TasksModule = TasksModule;
exports.TasksModule = TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([...tasks_index_1.taskEntity])
        ],
        controllers: [
            tasks_controller_1.TasksController,
            loginUser_controller_1.AuthController,
            tasksDetails_controller_1.TaskDetailsController,
            steps_controller_1.StepsController
        ],
        providers: [
            tasks_service_1.TasksService,
            loginUser_service_1.UserService,
            jwt_1.JwtService,
            tasksDetails_service_1.TaskDetailsService,
            steps_service_1.StepsService
        ],
        exports: []
    })
], TasksModule);
//# sourceMappingURL=tasks.module.js.map