import { Photo, User } from "generated/client";
export declare class CommentModel {
    id: string;
    payload: string;
    photo?: Photo;
    user: User;
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
