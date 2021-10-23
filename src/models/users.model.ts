import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType({ isAbstract: true })
@ObjectType()
export class UserModel {
  @Field(type => String)
  id: string
  @Field(type => String)
  username: string
  @Field(type => String)
  name: string
  @Field(type => String)
  email: string
  @Field(type => String)
  password: string
  @Field(type => String, { nullable: true })
  bio?: string
  @Field(type => String, { nullable: true })
  avatar?: string
  @Field(type => [UserModel], { nullable: true })
  following?: UserModel[]
  @Field(type => [UserModel], { nullable: true })
  followers?: UserModel[]
  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}