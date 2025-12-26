"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const sweggerPowerToDo_module_1 = require("./documentation/config/sweggerPowerToDo.module");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('power-to-do-nest-apis');
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'categoryid', 'taskid'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        enableDebugMessages: true,
        whitelist: true,
    }));
    process.on('uncaughtException', err => console.error('❌ Uncaught:', err));
    process.on('unhandledRejection', err => console.error('❌ Unhandled:', err));
    sweggerPowerToDo_module_1.SwaggerPowerToDoModule.setupSwagger(app);
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    await app.listen(port, '0.0.0.0');
    console.log('✅ Server running on port', port);
}
bootstrap();
//# sourceMappingURL=main.js.map