import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";
declare const MeInput_base: import("@nestjs/common").Type<Partial<Omit<UserModel, "createdAt" | "updatedAt">>>;
export declare class MeInput extends MeInput_base {
}
export declare class MeOutput extends OutputDto {
    user?: UserModel;
}
export {};
