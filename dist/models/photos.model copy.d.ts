import { UserModel } from "./users.model";
export declare class PhotoModel {
    id: string;
    file: string;
    caption?: string;
    users: UserModel[];
    createdAt: Date;
    updatedAt: Date;
}
