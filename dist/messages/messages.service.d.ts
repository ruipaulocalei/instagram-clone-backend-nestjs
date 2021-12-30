import { PubSub } from 'apollo-server-express';
import { Prisma, Room } from 'generated/client';
import { RoomModel } from 'src/models/rooms.model';
import { UserModel } from 'src/models/users.model';
import { PrismaService } from 'src/prisma.service';
import { SendMessageInput, SendMessageOutput } from 'src/users/dtos/send-message.dto';
export declare class MessagesService {
    private readonly prisma;
    private readonly pubSub;
    constructor(prisma: PrismaService, pubSub: PubSub);
    seeRooms({ id }: UserModel): Promise<RoomModel[]>;
    sendMessage({ payload, roomId, userId }: SendMessageInput, { id }: Prisma.UserWhereUniqueInput): Promise<SendMessageOutput>;
    seeRoom({ id: roomId }: Prisma.RoomWhereUniqueInput, { id }: Prisma.UserWhereUniqueInput): Promise<Room>;
}
