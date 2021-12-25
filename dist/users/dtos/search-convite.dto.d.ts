import { User } from "prisma/generated/client";
import { OutputDto } from "src/common/dtos/output.dto";
export declare class SearchUserInput {
    query: string;
}
export declare class SearchUserOutput extends OutputDto {
    users?: User[];
}
