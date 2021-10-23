import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FollowUserInput {
  @Field(type => String)
  username: string
}