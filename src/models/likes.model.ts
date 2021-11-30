import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType({ isAbstract: true })
@ObjectType()
export class LikeModel {
  @Field(type => String)
  id: string
  @Field(type => String)
  user: string
  @Field(type => String)
  photo: string
  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}