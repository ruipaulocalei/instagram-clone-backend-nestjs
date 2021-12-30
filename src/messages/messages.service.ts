import { Inject, Injectable } from '@nestjs/common';
import { PubSub } from 'apollo-server-express';
import { Prisma, Room } from 'generated/client';
import { NEW_MESSAGE, PUB_SUB } from 'src/common/constants';
import { RoomModel } from 'src/models/rooms.model';
import { UserModel } from 'src/models/users.model';
import { PrismaService } from 'src/prisma.service';
import { SendMessageInput, SendMessageOutput } from 'src/users/dtos/send-message.dto';

@Injectable()
export class MessagesService {

  constructor(private readonly prisma: PrismaService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub
  ) { }
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
          messages: {
            include: {
              user: true
            }
          }
        }
      })
    } catch (error) {

    }
  }

}
