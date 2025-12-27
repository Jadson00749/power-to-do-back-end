import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Tenta pegar do ConfigService primeiro, senão usa process.env diretamente
    const secret = configService.get<string>('JWT_KEY') || process.env.JWT_KEY;
    
    console.log('🔑 JwtStrategy - Carregando JWT_KEY...');
    console.log('ConfigService JWT_KEY:', !!configService.get<string>('JWT_KEY'));
    console.log('process.env.JWT_KEY:', !!process.env.JWT_KEY);
    
    if (!secret) {
      console.error('❌ JWT_KEY não encontrada em nenhum lugar!');
      console.error('Variáveis disponíveis:', Object.keys(process.env).filter(k => k.includes('JWT')));
      throw new Error('JWT_KEY não está definida nas variáveis de ambiente!');
    }
    
    console.log('✅ JWT_KEY carregada com sucesso (length:', secret.length, ')');
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }
    return { email: payload.email, password: payload.password, name: payload.name };
  }
}
