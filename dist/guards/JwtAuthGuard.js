"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const moment = require("moment");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const path = request.route.path;
        if (path === '/power-to-do-nest-apis/login/user' || path === '/power-to-do-nest-apis/login/user/create') {
            return true;
        }
        if (!authorization) {
            throw new common_1.UnauthorizedException({
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
        }
        catch (error) {
            this.handleJwtError(error);
        }
    }
    handleJwtError(error) {
        console.error('JWT Error:', error);
        if (error.name === 'TokenExpiredError') {
            throw new common_1.UnauthorizedException({
                status: 401,
                message: `O tempo de vida de seu token expirou, venceu em ${moment(error.expiredAt).format('DD/MM/YYYY HH:mm')}`,
            });
        }
        else if (error.name === 'JsonWebTokenError') {
            this.handleJsonWebTokenError(error);
        }
        else {
            throw new common_1.UnauthorizedException({
                status: 401,
                message: 'Falha ao gerar seu token, jwt não está ativo.',
            });
        }
    }
    handleJsonWebTokenError(error) {
        const errorMessages = {
            'jwt malformed': 'Falha ao gerar seu token (malformed)',
            'jwt signature is required': 'Falha ao gerar seu token, assinatura é obrigatória.',
            'invalid signature': 'Falha ao gerar seu token, assinatura inválida.',
        };
        const message = errorMessages[error.message] || `Falha ao gerar seu token, ${error.message}`;
        throw new common_1.UnauthorizedException({
            status: 401,
            message,
        });
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthGuard);
//# sourceMappingURL=JwtAuthGuard.js.map