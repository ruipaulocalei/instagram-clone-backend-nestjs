import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";
declare const EditProfileInput_base: import("@nestjs/common").Type<Partial<Pick<UserModel, keyof UserModel>>>;
export declare class EditProfileInput extends EditProfileInput_base {
}
export declare class EditProfileOutput extends OutputDto {
}
export {};
