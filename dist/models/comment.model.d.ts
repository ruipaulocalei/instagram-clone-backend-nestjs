import { Comment, Photo, User } from "prisma/generated/client";
export declare class CommentModel {
    id: string;
    payload: string;
    photo?: Photo;
    user: User;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
