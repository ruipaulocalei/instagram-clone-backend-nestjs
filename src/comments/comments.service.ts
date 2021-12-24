import { Injectable } from '@nestjs/common';
import { userInfo } from 'os';
import { Photo, Prisma, User } from 'prisma/generated/client';
import { PhotoModel } from 'src/models/photos.model';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentInput, CreateCommentOutput } from './dtos/create-comment.dto';
import { DeleteCommentInput, DeleteCommentOutput } from './dtos/delete-comment.dto';
import { EditCommentInput, EditCommentOutput } from './dtos/edit-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async createComment(user: User, { payload, photoId: id }: CreateCommentInput): Promise<CreateCommentOutput> {
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

  async deleteComment(user: User, { commentId }: DeleteCommentInput): Promise<DeleteCommentOutput> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: commentId
        },
        select: {
          userId: true
        }
      })
      if (!comment) {
        return {
          ok: false,
          error: 'Impossible find comment'
        }
      } else if (comment.userId !== user.id) {
        return {
          ok: false,
          error: 'This comment isn\'t your'
        }
      } else {
        await this.prisma.comment.delete({
          where: {
            id: commentId
          }
        })
      }
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An error occured'
      }
    }
  }

  async editComment(user: User, { commentId, payload }: EditCommentInput): Promise<EditCommentOutput> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: {
          id: commentId
        },
        select: {
          userId: true
        }
      })
      if (!comment) {
        return {
          ok: false,
          error: 'Impossible find comment'
        }
      } else if (comment.userId !== user.id) {
        return {
          ok: false,
          error: 'This comment isn\'t your'
        }
      } else {
        await this.prisma.comment.update({
          where: {
            id: commentId
          },
          data: {
            payload
          }
        })
      }
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An error occured'
      }
    }
  }
}
