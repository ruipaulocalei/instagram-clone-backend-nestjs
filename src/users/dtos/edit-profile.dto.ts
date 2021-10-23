import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@InputType()
export class EditProfileInput extends PartialType(PickType(UserModel,
  ['name', 'email', 'password', 'username', 'avatar', 'bio'])) {
}

@ObjectType()
export class EditProfileOutput extends OutputDto { }