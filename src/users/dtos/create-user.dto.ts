import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@InputType()
export class CreateUserInput extends PickType(UserModel, ['email', 'username', 'password', 'name']) { }

@ObjectType()
export class CreateUserOutput extends OutputDto { }