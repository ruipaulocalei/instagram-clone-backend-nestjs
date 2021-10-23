import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { SeeProfileOutput } from "./dtos/see-profile.dto";
import { UsersService } from "./users.service";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(data: CreateUserInput): Promise<CreateUserOutput>;
    seeProfile(username: string): Promise<SeeProfileOutput>;
}
