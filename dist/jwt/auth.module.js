"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const loginUser_service_1 = require("../apis/login/loginUser.service");
const jwt_strategy_1 = require("./jwt.strategy");
const loginUser_controller_1 = require("../apis/login/loginUser.controller");
const typeorm_1 = require("@nestjs/typeorm");
const USERS_1 = require("../entity/user/USERS");
const config_1 = require("@nestjs/config");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([USERS_1.UsersEntity]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_KEY'),
                    signOptions: { expiresIn: '30m' },
                }),
                inject: [config_1.ConfigService]
            }),
        ],
        providers: [loginUser_service_1.UserService, jwt_strategy_1.JwtStrategy],
        controllers: [loginUser_controller_1.AuthController],
        exports: [loginUser_service_1.UserService, jwt_1.JwtModule]
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map