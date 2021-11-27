import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";
export declare class UserProfileInput {
    userId: string;
}
export declare class UserProfileOutput extends OutputDto {
    user?: UserModel;
}
