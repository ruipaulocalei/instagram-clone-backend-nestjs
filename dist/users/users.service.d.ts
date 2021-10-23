import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { Prisma } from 'prisma/generated/client';
import { SeeProfileOutput } from './dtos/see-profile.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser({ email, password, username, name }: CreateUserInput): Promise<CreateUserOutput>;
    seeProfile({ username }: Prisma.UserWhereUniqueInput): Promise<SeeProfileOutput>;
}
