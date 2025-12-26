import { UserService } from './loginUser.service';
import { UsersModel } from "models/users";
export declare class AuthController {
    private readonly AuthService;
    constructor(AuthService: UserService);
    redirectLogin(data: UsersModel): Promise<{
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
    create(data: UsersModel): Promise<import("../../entity/user/USERS").UsersEntity>;
}
