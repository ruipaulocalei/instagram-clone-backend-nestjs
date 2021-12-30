import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Photo, User } from "generated/client";
import { PhotoModel } from "./photos.model";
import { UserModel } from "./users.model";

@InputType({ isAbstract: true })
@ObjectType()
export class CommentModel {
  @Field(type => String)
  id: string
  @Field(type => String)
  payload: string
  @Field(type => PhotoModel)
  photo?: Photo
  @Field(type => UserModel)
  user: User
  @Field(type => [CommentModel])
  comments: Comment[]
  @Field(type => Date)
  createdAt: Date
  @Field(type => Date)
  updatedAt: Date
}