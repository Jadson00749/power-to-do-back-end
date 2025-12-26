import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as moment from 'moment';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(public readonly jwtService: JwtService) {} 

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;
    const path = request.route.path;
    
    if (path === '/power-to-do-nest-apis/login/user' || path === '/power-to-do-nest-apis/login/user/create') { 
      return true;
    }

    if (!authorization) {
      throw new UnauthorizedException({
        status: 401,
        message: 'Token não informado, falha na autenticação!',
      });
    }

    const [, token] = authorization.split(' ');

    try {

      const decodedToken = this.jwtService.verify(token, {
        secret: '5DvsHylsgOB23zdwPwp0SFaAwNJPveVu0//bKqwSx7A=',
      });
      request['jwtToken'] = decodedToken.sub;
      return true;
    } catch (error) {
      this.handleJwtError(error);
    }
  }

  private handleJwtError(error: any): void {
    console.error('JWT Error:', error);

    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedException({
        status: 401,
        message: `O tempo de vida de seu token expirou, venceu em ${moment(error.expiredAt).format('DD/MM/YYYY HH:mm')}`,
      });
    } else if (error.name === 'JsonWebTokenError') {
      this.handleJsonWebTokenError(error);
    } else {
      throw new UnauthorizedException({
        status: 401,
        message: 'Falha ao gerar seu token, jwt não está ativo.',
      });
    }
  }

  private handleJsonWebTokenError(error: any): void {
    const errorMessages = {
      'jwt malformed': 'Falha ao gerar seu token (malformed)',
      'jwt signature is required': 'Falha ao gerar seu token, assinatura é obrigatória.',
      'invalid signature': 'Falha ao gerar seu token, assinatura inválida.',
    };

    const message = errorMessages[error.message] || `Falha ao gerar seu token, ${error.message}`;

    throw new UnauthorizedException({
      status: 401,
      message,
    });
  }
}
