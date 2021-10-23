import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { FollowUserInput } from "./dtos/follow-user.dto";
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
    editProfile(authUser: UserModel, { name, email, password, username }: EditProfileInput): Promise<EditProfileOutput>;
    followUser(authUser: UserModel, { username }: FollowUserInput): Promise<OutputDto>;
    unfollowUser(authUser: UserModel, { username }: FollowUserInput): Promise<OutputDto>;
}
