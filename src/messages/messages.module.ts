import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/users/users.service';
import { MessagesResolver } from './messages.resolver';
import { MessagesService } from './messages.service';

@Module({
  providers: [MessagesService, PrismaService, MessagesResolver, UsersService]
})
export class MessagesModule { }
