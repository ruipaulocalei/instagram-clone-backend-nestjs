import { Message } from "prisma/generated/client";
import { RoomModel } from "src/models/rooms.model";
import { UserModel } from "src/models/users.model";
import { SeeRoomInput } from "src/users/dtos/see-room.dto";
import { SendMessageInput } from "src/users/dtos/send-message.dto";
import { MessagesService } from "./messages.service";
export declare class MessagesResolver {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    seeRooms(authUser: UserModel): Promise<RoomModel[]>;
    seeRoom({ roomId }: SeeRoomInput, authUser: UserModel): Promise<import("prisma/generated/client").Room>;
    sendMessage({ payload, roomId, userId }: SendMessageInput, authUser: UserModel): Promise<import("src/users/dtos/send-message.dto").SendMessageOutput>;
    isMine(message: Message, authUser: UserModel): boolean;
}
