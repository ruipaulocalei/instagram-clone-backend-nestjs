import { Field, ObjectType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@ObjectType()
export class SeeProfileOutput extends OutputDto {
  @Field(type => UserModel, { nullable: true })
  profile?: UserModel
}