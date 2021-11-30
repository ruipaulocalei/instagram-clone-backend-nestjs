import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { RoomModel } from "./rooms.model";
import { UserModel } from "./users.model";

@InputType({ isAbstract: true })
@ObjectType()
export class MessageModel {
  @Field(type => String)
  id: string
  @Field(type => String)
  payload: string
  @Field(type => RoomModel, { nullable: true })
  room?: RoomModel
  @Field(type => UserModel, { nullable: true })
  user?: UserModel
  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}