import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { Prisma } from 'prisma/generated/client';
import { SeeProfileOutput } from './dtos/see-profile.dto';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';
import { UserModel } from 'src/models/users.model';
import { EditProfileOutput } from './dtos/edit-profile.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser({ email, password, username, name }: CreateUserInput): Promise<CreateUserOutput>;
    seeProfile({ username }: Prisma.UserWhereUniqueInput): Promise<SeeProfileOutput>;
    login({ username, password }: LoginInputDto): Promise<LoginOutputDto>;
    findById({ id }: Prisma.UserWhereUniqueInput): Promise<UserModel>;
    editProfile({ id }: Prisma.UserWhereUniqueInput, { email, name, password: newPassword, username, }: Prisma.UserCreateInput): Promise<EditProfileOutput>;
}
