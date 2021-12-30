import { Comment, User } from "../../generated/client";
import { UserModel } from "src/models/users.model";
import { CommentsService } from "./comments.service";
import { CreateCommentInput, CreateCommentOutput } from "./dtos/create-comment.dto";
import { DeleteCommentInput, DeleteCommentOutput } from "./dtos/delete-comment.dto";
import { EditCommentInput, EditCommentOutput } from "./dtos/edit-comment.dto";
export declare class CommentResolver {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment({ payload, photoId }: CreateCommentInput, authUser: User): Promise<CreateCommentOutput>;
    deleteComment({ commentId }: DeleteCommentInput, authUser: User): Promise<DeleteCommentOutput>;
    editComment({ commentId, payload }: EditCommentInput, authUser: User): Promise<EditCommentOutput>;
    isMine(comment: Comment, authUser: UserModel): boolean;
}
