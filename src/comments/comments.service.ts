import { Injectable } from '@nestjs/common';
import { userInfo } from 'os';
import { Photo, Prisma, User } from 'prisma/generated/client';
import { PhotoModel } from 'src/models/photos.model';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentInput, CreateCommentOutput } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async createComment(user: User, { payload, photo: id }: CreateCommentInput): Promise<CreateCommentOutput> {
    try {
      const photo = await this.prisma.photo.findUnique({
        where: {
          id
        },
        select: {
          id: true
        }
      })
      if (!photo) {
        return {
          ok: false,
          error: 'Photo not found'
        }
      }
      await this.prisma.comment.create({
        data: {
          payload,
          photo: {
            connect: {
              id: photo.id
            }
          },
          user: {
            connect: {
              id: user.id
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
        error: 'Um erro inesperado ocorreu ' + error
      }
    }
  }
}
