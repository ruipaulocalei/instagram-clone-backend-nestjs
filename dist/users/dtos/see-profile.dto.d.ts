import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";
export declare class SeeProfileOutput extends OutputDto {
    profile?: UserModel;
}
