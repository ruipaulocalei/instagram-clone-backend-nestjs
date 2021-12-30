import { Photo } from "generated/client";
import { OutputDto } from "src/common/dtos/output.dto";
import { PhotoModel } from "src/models/photos.model";
declare const CreatePhotoInput_base: import("@nestjs/common").Type<Pick<PhotoModel, "file" | "caption">>;
export declare class CreatePhotoInput extends CreatePhotoInput_base {
}
export declare class CreatePhotoOutput extends OutputDto {
    photos?: Photo[];
}
export {};
