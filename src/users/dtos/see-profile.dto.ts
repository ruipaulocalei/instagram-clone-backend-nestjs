import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@ObjectType()
export class SeeProfileOutput extends OutputDto {
  @Field(type => UserModel, { nullable: true })
  profile?: User
}