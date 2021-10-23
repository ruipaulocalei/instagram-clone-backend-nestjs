import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { UserModel } from "src/models/users.model";

@InputType()
export class LoginInputDto extends PickType(UserModel, ['username', 'password']) { }

@ObjectType()
export class LoginOutputDto extends OutputDto {
  @Field(type => String, { nullable: true })
  token?: string
}