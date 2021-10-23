import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService, PrismaService, UsersResolver, JwtMiddleware],
  exports: [UsersService]
})
export class UsersModule { }
