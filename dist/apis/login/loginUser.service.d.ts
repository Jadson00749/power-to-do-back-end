import { Repository } from 'typeorm';
import { UsersEntity } from "entity/user/USERS";
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from "models/users";
export declare class UserService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: Repository<UsersEntity>, jwtService: JwtService);
    validateUser(data: UsersModel): Promise<{
        authUser: {
            userId: number;
            email: string;
            name: string;
            creationDate: string;
        };
        token: string;
        expiresIn: any;
        auth: boolean;
    }>;
    createUser(data: UsersModel): Promise<UsersEntity>;
}
