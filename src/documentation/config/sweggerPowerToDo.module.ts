import { DynamicModule, Module } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TasksModule } from 'apis/tasks.module'; 

@Module({})
export class SwaggerPowerToDoModule {
  static setupSwagger(app:any): DynamicModule {

    const tasksConfig = new DocumentBuilder()
      .setTitle('Power-To-Do APIs')
      .setDescription('Documentação das APIs do Power To-Do')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
      .build();

    const tasksDocument = SwaggerModule.createDocument(app, tasksConfig, {
      include: [TasksModule]
    });

    SwaggerModule.setup('power-to-do-nest-apis', app, tasksDocument);

    return {
      module: SwaggerPowerToDoModule,
    };
  }
}