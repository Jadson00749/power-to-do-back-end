import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'apis/login/loginUser.service'; 
import { JwtStrategy } from './jwt.strategy'; 
import { AuthController } from 'apis/login/loginUser.controller'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'entity/user/USERS';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersEntity]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_KEY');
        if (!secret) {
          throw new Error('JWT_KEY não está definida nas variáveis de ambiente!');
        }
        return {
          secret: secret,
          signOptions: { expiresIn: '30m' },
        };
      },
      inject:[ConfigService]
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [AuthController],
  exports: [UserService,JwtModule]
})
export class AuthModule {}
