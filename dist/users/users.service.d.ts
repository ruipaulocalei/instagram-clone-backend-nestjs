import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { SeeProfileOutput } from './dtos/see-profile.dto';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';
import { UserModel } from 'src/models/users.model';
import { EditProfileOutput } from './dtos/edit-profile.dto';
import { OutputDto } from 'src/common/dtos/output.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { PubSub } from 'graphql-subscriptions';
import { SearchUserInput, SearchUserOutput } from './dtos/search-convite.dto';
import { Prisma, Room, User } from 'generated/client';
export declare class UsersService {
    private readonly prisma;
    private readonly pubSub;
    constructor(prisma: PrismaService, pubSub: PubSub);
    createUser({ email, password, username, name }: CreateUserInput): Promise<CreateUserOutput>;
    seeProfile({ username }: Prisma.UserWhereUniqueInput): Promise<SeeProfileOutput>;
    login({ username, password }: LoginInputDto): Promise<LoginOutputDto>;
    findById({ id }: Prisma.UserWhereUniqueInput): Promise<UserProfileOutput>;
    me({ id }: Prisma.UserWhereUniqueInput): Promise<User>;
    editProfile({ id }: Prisma.UserWhereUniqueInput, { email, name, password: newPassword, username }: Prisma.UserCreateInput): Promise<EditProfileOutput>;
    followUser(id: string, { username }: Prisma.UserWhereUniqueInput): Promise<OutputDto>;
    unfollowUser(id: string, { username }: Prisma.UserWhereUniqueInput): Promise<OutputDto>;
    totalFollowers({ id }: Prisma.UserWhereUniqueInput): Promise<number>;
    totalPublish({ id }: Prisma.UserWhereUniqueInput): Promise<number>;
    totalFollowing({ id }: UserModel): Promise<number>;
    isFollowing({ id }: UserModel, user: UserModel): Promise<boolean>;
    users({ id }: Prisma.RoomWhereUniqueInput): Promise<Room[]>;
    searchUserByUsername({ query }: SearchUserInput): Promise<SearchUserOutput>;
}
