import { Comment } from "prisma/generated/client";
import { OutputDto } from "src/common/dtos/output.dto";
import { CommentModel } from "src/models/comment.model";
declare const CreateCommentInput_base: import("@nestjs/common").Type<Pick<CommentModel, "payload">>;
export declare class CreateCommentInput extends CreateCommentInput_base {
    photoId: string;
}
export declare class CreateCommentOutput extends OutputDto {
    Comments?: Comment[];
}
export {};
