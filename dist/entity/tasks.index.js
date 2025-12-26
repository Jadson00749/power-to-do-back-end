"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskEntity = void 0;
const TASKS_entity_1 = require("./tasks/TASKS.entity");
const USERS_1 = require("./user/USERS");
const TASK_DETAILS_entity_1 = require("./tasks/TASK_DETAILS.entity");
const STEPS_entity_1 = require("../entity/steps/STEPS.entity");
exports.taskEntity = [
    TASKS_entity_1.TasksEntity,
    USERS_1.UsersEntity,
    TASK_DETAILS_entity_1.TasksDetailsEntity,
    STEPS_entity_1.StepsEntity
];
//# sourceMappingURL=tasks.index.js.map