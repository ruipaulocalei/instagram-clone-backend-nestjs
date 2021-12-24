import { Comment, User } from "prisma/generated/client";
import { UserModel } from "src/models/users.model";
import { CommentsService } from "./comments.service";
import { CreateCommentInput, CreateCommentOutput } from "./dtos/create-comment.dto";
import { DeleteCommentInput, DeleteCommentOutput } from "./dtos/delete-comment.dto";
export declare class CommentResolver {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment({ payload, photoId }: CreateCommentInput, authUser: User): Promise<CreateCommentOutput>;
    deleteComment({ commentId }: DeleteCommentInput, authUser: User): Promise<DeleteCommentOutput>;
    isMine(comment: Comment, authUser: UserModel): boolean;
}
