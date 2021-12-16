import { User } from 'prisma/generated/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentInput, CreateCommentOutput } from './dtos/create-comment.dto';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createComment(user: User, { payload, photo: id }: CreateCommentInput): Promise<CreateCommentOutput>;
}
