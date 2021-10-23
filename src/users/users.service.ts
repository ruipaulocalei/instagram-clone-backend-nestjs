import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { compare, hash } from 'bcrypt'
import { Prisma } from 'prisma/generated/client';
import { UserModel } from 'src/models/users.model';
import { SeeProfileOutput } from './dtos/see-profile.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }
  async createUser({ email, password, username, name }: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const userExists = await this.prisma.user.findFirst({
        where: {
          OR: [
            {
              email
            },
            {
              username
            }
          ]
        }
      })
      if (userExists) {
        return {
          ok: false,
          error: 'User already exists'
        }
      }
      const hashedPassword = await hash(password, 10)
      await this.prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
          username
        }
      })
      return {
        ok: true
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An error occured. Try again...'
      }
    }
  }

  async seeProfile({ username }: Prisma.UserWhereUniqueInput): Promise<SeeProfileOutput> {
    try {
      const userExists = await this.prisma.user.findUnique({
        where: {
          username
        },
      })
      if (!userExists) {
        return {
          ok: false,
          error: 'This user does not exist.'
        }
      }
      return {
        ok: true,
        profile: userExists
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An error occured.'
      }
    }
  }
}
