import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { MessageModel } from "./message.model";
import { UserModel } from "./users.model";

@InputType({ isAbstract: true })
@ObjectType()
export class RoomModel {
  @Field(type => String)
  id: string
  @Field(type => [MessageModel], { nullable: true })
  messages?: MessageModel[]
  @Field(type => [UserModel,], { nullable: true })
  users?: UserModel[]
  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}