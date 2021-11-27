import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@ArgsType()
export class UserProfileInput {
  @Field(type => String)
  userId: string
}

@ObjectType()
export class UserProfileOutput extends OutputDto {
  @Field(type => UserModel, { nullable: true })
  user?: UserModel
}