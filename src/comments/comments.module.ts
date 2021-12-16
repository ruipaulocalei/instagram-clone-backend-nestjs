import { Module } from '@nestjs/common';
import { PrismaClient } from 'prisma/generated/client';
import { PhotosService } from 'src/photos/photos.service';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CommentResolver } from './comment.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [CommentsService, PhotosService, UsersService,
    PrismaService, CommentResolver]
})
export class CommentsModule { }
