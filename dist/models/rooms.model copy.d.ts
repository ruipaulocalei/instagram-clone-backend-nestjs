import { MessageModel } from "./message.model";
import { UserModel } from "./users.model";
export declare class RoomModel {
    id: string;
    messages?: MessageModel[];
    users?: UserModel[];
    createdAt: Date;
    updatedAt: Date;
}
