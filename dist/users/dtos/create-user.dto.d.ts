import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";
declare const CreateUserInput_base: import("@nestjs/common").Type<Pick<UserModel, "email" | "username" | "password" | "name">>;
export declare class CreateUserInput extends CreateUserInput_base {
}
export declare class CreateUserOutput extends OutputDto {
}
export {};
