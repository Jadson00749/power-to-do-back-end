import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { taskEntity } from 'entity/tasks.index'; 
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller'; 
import { TaskDetailsService } from './taskDetails/tasksDetails.service'; 
import { TaskDetailsController } from './taskDetails/tasksDetails.controller'; 
import { AuthController } from './login/loginUser.controller'; 
import { UserService } from './login/loginUser.service'; 
import { JwtService } from '@nestjs/jwt';
import { StepsService } from './steps/steps.service';
import { StepsController } from './steps/steps.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([...taskEntity])
  ],
  controllers: [
    TasksController,
    AuthController,
    TaskDetailsController,
    StepsController
  ],
  providers: [
    TasksService,
    UserService,
    JwtService,
    TaskDetailsService,
    StepsService
  ],
  exports: []
})

export class TasksModule {}