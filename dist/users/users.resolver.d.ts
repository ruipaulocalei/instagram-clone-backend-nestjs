import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { LoginInputDto, LoginOutputDto } from "./dtos/login.dto";
import { SeeProfileOutput } from "./dtos/see-profile.dto";
import { UsersService } from "./users.service";
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(data: CreateUserInput): Promise<CreateUserOutput>;
    seeProfile(username: string): Promise<SeeProfileOutput>;
    login({ username, password }: LoginInputDto): Promise<LoginOutputDto>;
    me(authUser: UserModel): UserModel;
}
