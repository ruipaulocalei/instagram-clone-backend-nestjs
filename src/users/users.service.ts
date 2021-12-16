import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput, CreateUserOutput } from './dtos/create-user.dto';
import { compare, hash } from 'bcrypt'
import { Prisma, Room, User } from 'prisma/generated/client';
import { SeeProfileOutput } from './dtos/see-profile.dto';
import { LoginInputDto, LoginOutputDto } from './dtos/login.dto';
import { sign, verify } from 'jsonwebtoken'
// import { Prisma, User } from '@prisma/client';
import { UserModel } from 'src/models/users.model';
import { EditProfileOutput } from './dtos/edit-profile.dto';
import { OutputDto } from 'src/common/dtos/output.dto';
import { FollowUserInput } from './dtos/follow-user.dto';
import { RoomModel } from 'src/models/rooms.model';
import { SendMessageInput, SendMessageOutput } from './dtos/send-message.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { NEW_MESSAGE, PUB_SUB } from 'src/common/constants';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub
  ) { }
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
        include: {
          followers: true,
          following: true,
          photos: true
        }
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

  async findById({ id }: Prisma.UserWhereUniqueInput): Promise<UserProfileOutput> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id
        },
      })
      if (!user) {
        return {
          ok: false,
          error: 'Utilizador não encontrado'
        }
      }
      return {
        ok: true,
        user
      }
    } catch (error) {
      console.log(error)
    }
  }

  async me({ id }: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      const owner = await this.prisma.user.findUnique({
        where: {
          id
        }
      })
      return owner
    } catch (error) {

    }
  }

  async editProfile({ id }: Prisma.UserWhereUniqueInput, {
    email, name, password: newPassword, username
  }: Prisma.UserCreateInput): Promise<EditProfileOutput> {
    try {
      let hashedPassword = null
      if (newPassword) {
        hashedPassword = await hash(newPassword, 10)
      }
      const user = await this.prisma.user.update({
        where: {
          id
        },
        data: {
          email,
          name,
          username,
          ...(hashedPassword && { password: hashedPassword })
        }
      })
      if (user.id) {
        return {
          ok: true,
        }
      }
      return {
        ok: false,
        error: 'Erro ao actualizar o teu perfil',
      }
    } catch (error) {
      return {
        ok: false,
        error: 'Ocorreu um erro inesperado. Tente novamente',
      }
    }
  }

  async followUser(id: string, { username }: Prisma.UserWhereUniqueInput): Promise<OutputDto> {
    try {
      const user = await this.prisma.user.findUnique({ where: { username } })
      if (!user) {
        return {
          ok: false,
          error: 'This user does not exists'
        }
      }
      await this.prisma.user.update({
        where: {
          id
        },
        data: {
          following: {
            connect: {
              username
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
        error: 'An error occured. Try again!...'
      }
    }
  }

  async unfollowUser(id: string, { username }: Prisma.UserWhereUniqueInput): Promise<OutputDto> {
    try {
      const user = await this.prisma.user.findUnique({ where: { username } })
      if (!user) {
        return {
          ok: false,
          error: 'This user does not exists'
        }
      }
      await this.prisma.user.update({
        where: {
          id
        },
        data: {
          following: {
            disconnect: {
              username
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
        error: 'An error occured. Try again!...'
      }
    }
  }

  totalFollowers({ id }: Prisma.UserWhereUniqueInput): Promise<number> {
    return this.prisma.user.count({
      where: {
        following: {
          some: {
            id
          }
        }
      }
    })
  }

  totalPublish({ id }: Prisma.UserWhereUniqueInput): Promise<number> {
    return this.prisma.photo.count({
      where: {
        userId: id
      }
    })
  }

  totalFollowing({ id }: UserModel): Promise<number> {
    return this.prisma.user.count({
      where: {
        followers: {
          some: {
            id
          }
        }
      }
    })
  }

  async isFollowing({ id }: UserModel, user: UserModel) {
    if (!user) {
      return false
    }
    const ok = await this.prisma.user.count({
      where: {
        username: user.username,
        following: {
          some: {
            id
          }
        }
      }
    })
    return Boolean(ok)
  }

  async seeRooms({ id }: UserModel): Promise<RoomModel[]> {
    const room = await this.prisma.room.findMany({
      where: {
        users: {
          some: {
            id
          },
        },
      },
      include: {
        messages: true,
        users: true
      }
    })
    return room
  }

  async sendMessage({ payload, roomId, userId }: SendMessageInput,
    { id }: Prisma.UserWhereUniqueInput): Promise<SendMessageOutput> {
    let room = null
    try {
      if (userId) {
        const userFind = await this.prisma.user.findUnique({
          where: {
            id: userId
          },
          select: {
            id: true
          }
        })
        if (!userFind) {
          return {
            ok: false,
            error: 'User not found'
          }
        }
        room = await this.prisma.room.create({
          data: {
            users: {
              connect: [
                {
                  id: userId
                },
                {
                  id
                },
              ],
            },
          }
        })
      }

      if (roomId) {
        room = await this.prisma.room.findUnique({
          where: {
            id: roomId
          }, select: {
            id: true
          }
        })
        if (!room) {
          return {
            ok: false,
            error: 'Room not found'
          }
        }
      }

      const message = await this.prisma.message.create({
        data: {
          payload,
          room: {
            connect: {
              id: room.id
            }
          },
          user: {
            connect: {
              id
            }
          }
        }
      })
      this.pubSub.publish(NEW_MESSAGE, { messageUpdate: { ...message } })
      return {
        ok: true,
      }
    } catch (error) {
      return {
        ok: false,
        error: 'Ocorreu um erro inesperado ' + error
      }
    }
  }

  async seeRoom({ id: roomId }: Prisma.RoomWhereUniqueInput,
    { id }: Prisma.UserWhereUniqueInput): Promise<Room> {
    try {
      return await this.prisma.room.findFirst({
        where: {
          id: roomId,
          users: {
            some: {
              id
            }
          }
        },
        include: {
          users: true,
          messages: true
        }
      })
    } catch (error) {

    }
  }

  async users({ id }: Prisma.RoomWhereUniqueInput): Promise<Room[]> {
    try {
      return await this.prisma.room.findMany({
        where: {
          id
        }
      })
    } catch (error) {

    }
  }
}
