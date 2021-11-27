import { OutputDto } from "src/common/dtos/output.dto";
export declare class SendMessageInput {
    payload: string;
    roomId?: string;
    userId?: string;
}
export declare class SendMessageOutput extends OutputDto {
}
