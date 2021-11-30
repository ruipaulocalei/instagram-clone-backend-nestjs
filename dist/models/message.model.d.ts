import { RoomModel } from "./rooms.model";
import { UserModel } from "./users.model";
export declare class MessageModel {
    id: string;
    payload: string;
    room?: RoomModel;
    user?: UserModel;
    createdAt: Date;
    updatedAt: Date;
}
