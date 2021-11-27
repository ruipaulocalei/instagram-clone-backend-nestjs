import { CanActivate, ExecutionContext } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
export declare class AuthGuard implements CanActivate {
    private readonly usersService;
    constructor(usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
