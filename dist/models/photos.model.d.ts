import { Comment } from "prisma/generated/client";
import { UserModel } from "./users.model";
export declare class PhotoModel {
    id: string;
    file: string;
    caption?: string;
    user: UserModel;
    comment: [Comment];
    createdAt: Date;
    updatedAt: Date;
}
