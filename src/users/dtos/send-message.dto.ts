import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { MessageModel } from "src/models/message.model";
import { UserModel } from "src/models/users.model";

@InputType()
export class SendMessageInput {
  @Field(type => String)
  payload: string
  @Field(type => String, { nullable: true })
  roomId?: string
  @Field(type => String, { nullable: true })
  userId?: string
}

@ObjectType()
export class SendMessageOutput extends OutputDto { }