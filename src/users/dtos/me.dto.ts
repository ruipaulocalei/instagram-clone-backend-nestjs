import { Field, InputType, ObjectType, OmitType, PartialType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@InputType()
export class MeInput extends PartialType(OmitType(UserModel,
  ['createdAt', 'updatedAt'])) {
}

@ObjectType()
export class MeOutput extends OutputDto {
  @Field(type => UserModel, { nullable: true })
  user?: UserModel
}