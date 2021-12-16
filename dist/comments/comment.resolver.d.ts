import { User } from "prisma/generated/client";
import { CommentsService } from "./comments.service";
import { CreateCommentInput, CreateCommentOutput } from "./dtos/create-comment.dto";
export declare class CommentResolver {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment({ payload, photo }: CreateCommentInput, authUser: User): Promise<CreateCommentOutput>;
}
