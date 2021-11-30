import { OutputDto } from "src/common/dtos/output.dto";
import { LikeModel } from "src/models/likes.model";
declare const LikePhotoInput_base: import("@nestjs/common").Type<Pick<LikeModel, "id">>;
export declare class LikePhotoInput extends LikePhotoInput_base {
}
export declare class LikePhotoOutput extends OutputDto {
}
export {};
