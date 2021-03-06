import { User } from 'generated/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentInput, CreateCommentOutput } from './dtos/create-comment.dto';
import { DeleteCommentInput, DeleteCommentOutput } from './dtos/delete-comment.dto';
import { EditCommentInput, EditCommentOutput } from './dtos/edit-comment.dto';
export declare class CommentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createComment(user: User, { payload, photoId: id }: CreateCommentInput): Promise<CreateCommentOutput>;
    deleteComment(user: User, { commentId }: DeleteCommentInput): Promise<DeleteCommentOutput>;
    editComment(user: User, { commentId, payload }: EditCommentInput): Promise<EditCommentOutput>;
}
