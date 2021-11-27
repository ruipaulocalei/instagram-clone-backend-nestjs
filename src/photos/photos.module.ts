import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PhotoResolver } from './photos.resolver';
import { PhotosService } from './photos.service';

@Module({
  providers: [PhotosService, PrismaService, PhotoResolver, UsersService]
})
export class PhotosModule { }
