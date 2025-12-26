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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const USERS_1 = require("../../entity/user/USERS");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(data) {
        let query = this.userService.createQueryBuilder('r')
            .where('r.email = :email', { email: data?.email });
        let user = await query.getOne();
        if (!user) {
            throw new common_1.HttpException('Credenciais inválidas!', common_1.HttpStatus.BAD_REQUEST);
        }
        const validpassword = await bcrypt.compare(data.password, user.password);
        if (!validpassword) {
            throw new common_1.UnauthorizedException('Usuario ou senha inválida.');
        }
        const playload = {
            userId: user?.id,
            email: user?.email,
            name: user?.name,
            creationDate: user?.creationDate
        };
        return {
            authUser: {
                userId: user?.id,
                email: user?.email,
                name: user?.name,
                creationDate: user?.creationDate
            },
            token: this.jwtService.sign(playload),
            expiresIn: this.jwtService.decode(this.jwtService.sign(playload))['exp'],
            auth: true
        };
    }
    async createUser(data) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data?.password, saltRounds);
        const newUser = this.userService.create({
            ...data,
            password: hashedPassword
        });
        return this.userService.save(newUser);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(USERS_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=loginUser.service.js.map