import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { UserModel } from "./users.model";

@InputType({ isAbstract: true })
@ObjectType()
export class PhotoModel {
  @Field(type => String)
  id: string
  @Field(type => String)
  file: string
  @Field(type => String, { nullable: true })
  caption?: string
  @Field(type => [UserModel])
  users: UserModel[]
  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}