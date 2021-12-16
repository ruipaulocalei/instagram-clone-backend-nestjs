import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class SeeRoomInput {
  @Field(type => String)
  roomId: string
}
