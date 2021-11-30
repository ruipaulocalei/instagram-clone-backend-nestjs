import { User } from "@prisma/client";
import { OutputDto } from "src/common/dtos/output.dto";
export declare class SeeProfileOutput extends OutputDto {
    profile?: User;
}
