import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { Prisma, User } from 'prisma/generated/client';
import { SeeProfileOutput } from './dtos/see-profile.dto';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';
import { UserModel } from 'src/models/users.model';
import { EditProfileOutput } from './dtos/edit-profile.dto';
import { OutputDto } from 'src/common/dtos/output.dto';
import { RoomModel } from 'src/models/rooms.model';
import { SendMessageInput, SendMessageOutput } from './dtos/send-message.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser({ email, password, username, name }: CreateUserInput): Promise<CreateUserOutput>;
    seeProfile({ username }: Prisma.UserWhereUniqueInput): Promise<SeeProfileOutput>;
    login({ username, password }: LoginInputDto): Promise<LoginOutputDto>;
    findById({ id }: Prisma.UserWhereUniqueInput): Promise<UserProfileOutput>;
    me({ id }: Prisma.UserWhereUniqueInput): Promise<User>;
    editProfile({ id }: Prisma.UserWhereUniqueInput, { email, name, password: newPassword, username }: Prisma.UserCreateInput): Promise<EditProfileOutput>;
    followUser(id: string, { username }: Prisma.UserWhereUniqueInput): Promise<OutputDto>;
    unfollowUser(id: string, { username }: Prisma.UserWhereUniqueInput): Promise<OutputDto>;
    totalFollowers({ id }: Prisma.UserWhereUniqueInput): Promise<number>;
    totalFollowing({ id }: UserModel): Promise<number>;
    seeRooms({ id }: UserModel): Promise<RoomModel[] | null>;
    sendMessage({ payload, roomId, userId }: SendMessageInput, { id }: Prisma.UserWhereUniqueInput): Promise<SendMessageOutput>;
}
