import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser({ email, password, username, name }: CreateUserInput): Promise<CreateUserOutput>;
}
