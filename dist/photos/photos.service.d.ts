import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePhotoInput, CreatePhotoOutput } from './dtos/upload-photo.dto';
export declare class PhotosService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    uploadPhoto({ file, caption }: CreatePhotoInput, { id }: Prisma.UserWhereUniqueInput): Promise<CreatePhotoOutput>;
}
