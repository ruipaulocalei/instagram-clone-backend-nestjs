import { Injectable } from '@nestjs/common';
import { Comment, Photo, Prisma } from 'generated/client';
import { PhotoModel } from 'src/models/photos.model';
import { PrismaService } from 'src/prisma.service';
import { LikePhotoInput, LikePhotoOutput } from './dtos/like-photo.dto';
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

  async likePhoto({ id: photoId }: LikePhotoInput, { id: userId }: Prisma.UserWhereUniqueInput): Promise<LikePhotoOutput> {
    try {
      const photo = await this.prisma.photo.findUnique({
        where: {
          id: photoId
        }
      })
      if (!photo) {
        return {
          ok: false,
          error: 'Imagem não encontrada'
        }
      }

      const likeObject = {
        photoId_userId: {
          photoId: photo.id,
          userId
        }
      }
      const like = await this.prisma.like.findUnique({
        where: likeObject
      })
      if (like) {
        await this.prisma.like.delete({
          where: likeObject
        })
        return {
          ok: true
        }
      }
      await this.prisma.like.create({
        data: {
          user: {
            connect: {
              id: userId
            }
          },
          photo: {
            connect: {
              id: photo.id
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

  async feed(user: Prisma.UserWhereUniqueInput): Promise<Photo[]> {
    return await this.prisma.photo.findMany({
      where: {
        OR: [
          {
            user: {
              followers: {
                some: {
                  id: user.id
                }
              }
            }
          },
          {
            userId: user.id
          },
        ]
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: true,
        comments: true
      },
    })
  }

  numberLikes(photo: string): Promise<number> {
    return this.prisma.like.count({
      where: {
        photoId: photo
      },
    })
  }

  async comments(photo: string): Promise<Comment[]> {
    return await this.prisma.photo.findUnique({
      where: {
        id: photo
      },
    }).comments({
      orderBy: {
        createdAt: 'asc'
      }
    })
  }

  commentNumber(photo: string): Promise<number> {
    return this.prisma.comment.count({
      where: {
        photoId: photo
      },
    })
  }

  async isLiked({ id: photoId }: Photo, { id: userId }: Prisma.UserWhereUniqueInput): Promise<boolean> {
    if (!userId) {
      return false
    }
    const ok = await this.prisma.like.findUnique({
      where: {
        photoId_userId: {
          photoId,
          userId
        }
      },
    })
    if (ok) {
      return true
    }
    return false
  }
}
