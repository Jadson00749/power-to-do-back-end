import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { taskEntity } from './entity/tasks.index'; 
import { TasksModule } from 'apis/tasks.module';
import { AuthModule } from 'jwt/auth.module';
import { JwtAuthGuard } from 'guards/JwtAuthGuard'; 
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false, // Tenta carregar .env se existir, mas não falha se não existir
      expandVariables: true,
    }),
    ScheduleModule.forRoot(),
    forwardRef(() => TasksModule),
          TypeOrmModule.forRoot({
            type: 'mariadb',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 3306),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [...taskEntity],
            synchronize: false,
          }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

export class AppModule {}
