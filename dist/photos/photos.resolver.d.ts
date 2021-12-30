import { Photo, User } from "generated/client";
import { UserModel } from "src/models/users.model";
import { LikePhotoInput, LikePhotoOutput } from "./dtos/like-photo.dto";
import { CreatePhotoInput, CreatePhotoOutput } from "./dtos/upload-photo.dto";
import { PhotosService } from "./photos.service";
export declare class PhotoResolver {
    private readonly photosService;
    constructor(photosService: PhotosService);
    uploadPhoto({ file, caption }: CreatePhotoInput, authUser: UserModel): Promise<CreatePhotoOutput>;
    likePhoto({ id }: LikePhotoInput, authUser: UserModel): Promise<LikePhotoOutput>;
    feed(authUser: UserModel): Promise<Photo[]>;
    numberLikes(photo: Photo): Promise<number>;
    commentNumber(photo: Photo): Promise<number>;
    comments(photo: Photo): Promise<import("generated/client").Comment[]>;
    isMine(photo: Photo, authUser: UserModel): boolean;
    isLiked(id: Photo, user: User): Promise<boolean>;
}
