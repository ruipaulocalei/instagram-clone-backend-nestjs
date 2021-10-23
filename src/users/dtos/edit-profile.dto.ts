import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";
import { CreateUserInput } from "./create-user.dto";

@InputType()
export class EditProfileInput extends PartialType(PickType(UserModel, ['name', 'email', 'password', 'username'])) {
}

@ObjectType()
export class EditProfileOutput extends OutputDto { }