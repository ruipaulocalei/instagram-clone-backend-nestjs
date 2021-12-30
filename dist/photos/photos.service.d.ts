import { Comment, Photo, Prisma } from 'generated/client';
import { PrismaService } from 'src/prisma.service';
import { LikePhotoInput, LikePhotoOutput } from './dtos/like-photo.dto';
import { CreatePhotoInput, CreatePhotoOutput } from './dtos/upload-photo.dto';
export declare class PhotosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    uploadPhoto({ file, caption }: CreatePhotoInput, { id }: Prisma.UserWhereUniqueInput): Promise<CreatePhotoOutput>;
    likePhoto({ id: photoId }: LikePhotoInput, { id: userId }: Prisma.UserWhereUniqueInput): Promise<LikePhotoOutput>;
    feed(user: Prisma.UserWhereUniqueInput): Promise<Photo[]>;
    numberLikes(photo: string): Promise<number>;
    comments(photo: string): Promise<Comment[]>;
    commentNumber(photo: string): Promise<number>;
    isLiked({ id: photoId }: Photo, { id: userId }: Prisma.UserWhereUniqueInput): Promise<boolean>;
}
