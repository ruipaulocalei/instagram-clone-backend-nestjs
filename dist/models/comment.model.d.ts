import { Photo, User } from "prisma/generated/client";
export declare class CommentModel {
    id: string;
    payload: string;
    photo?: Photo;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
