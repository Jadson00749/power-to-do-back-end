"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const tasks_index_1 = require("./entity/tasks.index");
const tasks_module_1 = require("./apis/tasks.module");
const auth_module_1 = require("./jwt/auth.module");
const JwtAuthGuard_1 = require("./guards/JwtAuthGuard");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            schedule_1.ScheduleModule.forRoot(),
            (0, common_1.forwardRef)(() => tasks_module_1.TasksModule),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mariadb',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT || 3306),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [...tasks_index_1.taskEntity],
                synchronize: false,
            }),
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: JwtAuthGuard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map