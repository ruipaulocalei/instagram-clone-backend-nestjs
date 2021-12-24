import { OutputDto } from "src/common/dtos/output.dto";
import { CreateCommentInput } from "./create-comment.dto";
declare const EditCommentInput_base: import("@nestjs/common").Type<Pick<CreateCommentInput, "payload">>;
export declare class EditCommentInput extends EditCommentInput_base {
    commentId: string;
}
export declare class EditCommentOutput extends OutputDto {
}
export {};
