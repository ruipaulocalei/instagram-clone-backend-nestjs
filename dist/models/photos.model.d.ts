import { UserModel } from "./users.model";
export declare class PhotoModel {
    id: string;
    file: string;
    caption?: string;
    user: UserModel;
    createdAt: Date;
    updatedAt: Date;
}
