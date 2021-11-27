import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePhotoInput, CreatePhotoOutput } from './dtos/upload-photo.dto';

@Injectable()
export class PhotosService {
  constructor(private readonly prisma: PrismaService) { }
  async uploadPhoto({ file, caption }: CreatePhotoInput, { id }: Prisma.UserWhereUniqueInput): Promise<CreatePhotoOutput> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        }
      })
      if (!user) {
        return {
          ok: false,
          error: 'Utilizador não encontrado'
        }
      }
      await this.prisma.photo.create({
        data: {
          file,
          caption,
          user: {
            connect: {
              id
            }
          }
        }
      })
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error: 'Um erro inesperado ocorreu'
      }
    }
  }
}
