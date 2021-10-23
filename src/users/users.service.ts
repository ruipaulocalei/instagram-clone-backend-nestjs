import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { compare, hash } from 'bcrypt'
import { Prisma } from 'prisma/generated/client';
import { SeeProfileOutput } from './dtos/see-profile.dto';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';
import { sign, verify } from 'jsonwebtoken'

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

  async login({ username, password }: LoginInputDto): Promise<LoginOutputDto> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          username
        }
      })
      if (!user) {
        return {
          ok: false,
          error: 'User does not exists'
        }
      }
      const passwordDb = await compare(password, user.password)
      if (!passwordDb) {
        return {
          ok: false,
          error: 'Password wrong'
        }
      }
      const token = sign({ id: user.id }, 'jhghfvtygh57yghbvrdtugh76ugvhft6')
      return {
        ok: true,
        token
      }
    } catch (error) {
      return {
        ok: false,
        error: 'An error occured'
      }
    }
  }
}
