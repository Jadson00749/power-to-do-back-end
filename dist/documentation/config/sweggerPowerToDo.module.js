"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SwaggerPowerToDoModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerPowerToDoModule = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tasks_module_1 = require("../../apis/tasks.module");
let SwaggerPowerToDoModule = SwaggerPowerToDoModule_1 = class SwaggerPowerToDoModule {
    static setupSwagger(app) {
        const tasksConfig = new swagger_1.DocumentBuilder()
            .setTitle('Power-To-Do APIs')
            .setDescription('Documentação das APIs do Power To-Do')
            .setVersion('1.0')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
            .build();
        const tasksDocument = swagger_1.SwaggerModule.createDocument(app, tasksConfig, {
            include: [tasks_module_1.TasksModule]
        });
        swagger_1.SwaggerModule.setup('swagger', app, tasksDocument);
        return {
            module: SwaggerPowerToDoModule_1,
        };
    }
};
exports.SwaggerPowerToDoModule = SwaggerPowerToDoModule;
exports.SwaggerPowerToDoModule = SwaggerPowerToDoModule = SwaggerPowerToDoModule_1 = __decorate([
    (0, common_1.Module)({})
], SwaggerPowerToDoModule);
//# sourceMappingURL=sweggerPowerToDo.module.js.map