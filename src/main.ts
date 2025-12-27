import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerPowerToDoModule } from 'documentation/config/sweggerPowerToDo.module'; 
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('power-to-do-nest-apis');
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'categoryid', 'taskid'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      whitelist: true,
    }),
  );

  process.on('uncaughtException', err => console.error('❌ Uncaught:', err));
  process.on('unhandledRejection', err => console.error('❌ Unhandled:', err));
  console.log('DB HOST:', process.env.DB_HOST);
  console.log('DB USER:', process.env.DB_USERNAME);


  SwaggerPowerToDoModule.setupSwagger(app)
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port, '0.0.0.0');
  console.log('✅ Server running on port', port);
}
bootstrap();
