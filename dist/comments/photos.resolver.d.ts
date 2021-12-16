import { Photo, User } from "prisma/generated/client";
import { UserModel } from "src/models/users.model";
import { LikePhotoInput } from "./dtos/like-photo.dto";
import { CreatePhotoInput } from "./dtos/upload-photo.dto";
import { PhotosService } from "./photos.service";
export declare class PhotoResolver {
    private readonly photosService;
    constructor(photosService: PhotosService);
    uploadPhoto({ file, caption }: CreatePhotoInput, authUser: UserModel): any;
    likePhoto({ id }: LikePhotoInput, authUser: UserModel): any;
    feed(authUser: UserModel): any;
    numberLikes(photo: Photo): any;
    isMine(photo: Photo, authUser: UserModel): boolean;
    isLiked(id: Photo, user: User): Promise<boolean>;
}
