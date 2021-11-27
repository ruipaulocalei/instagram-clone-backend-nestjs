import { UserModel } from "./users.model";
export declare class MessageModel {
    id: string;
    payload: string;
    room?: UserModel;
    user?: UserModel;
    createdAt: Date;
    updatedAt: Date;
}
