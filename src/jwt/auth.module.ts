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
        // Tenta pegar do ConfigService primeiro, senão usa process.env diretamente
        const secret = configService.get<string>('JWT_KEY') || process.env.JWT_KEY;
        
        console.log('🔑 JwtModule - Carregando JWT_KEY...');
        console.log('ConfigService JWT_KEY:', !!configService.get<string>('JWT_KEY'));
        console.log('process.env.JWT_KEY:', !!process.env.JWT_KEY);
        
        if (!secret) {
          console.error('❌ JWT_KEY não encontrada!');
          console.error('Todas as variáveis de ambiente:', Object.keys(process.env));
          throw new Error('JWT_KEY não está definida nas variáveis de ambiente!');
        }
        
        console.log('✅ JWT_KEY carregada no JwtModule (length:', secret.length, ')');
        
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
