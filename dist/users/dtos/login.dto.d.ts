import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";
declare const LoginInputDto_base: import("@nestjs/common").Type<Pick<UserModel, "username" | "password">>;
export declare class LoginInputDto extends LoginInputDto_base {
}
export declare class LoginOutputDto extends OutputDto {
    token?: string;
}
export {};
