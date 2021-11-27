import { UserModel } from "src/models/users.model";
import { CreatePhotoInput, CreatePhotoOutput } from "./dtos/upload-photo.dto";
import { PhotosService } from "./photos.service";
export declare class PhotoResolver {
    private readonly photosService;
    constructor(photosService: PhotosService);
    uploadPhoto({ file, caption }: CreatePhotoInput, authUser: UserModel): Promise<CreatePhotoOutput>;
}
