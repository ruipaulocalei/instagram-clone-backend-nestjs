export declare class UserModel {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    bio?: string;
    avatar?: string;
    following?: UserModel[];
    followers?: UserModel[];
    createdAt: Date;
    updatedAt: Date;
}
