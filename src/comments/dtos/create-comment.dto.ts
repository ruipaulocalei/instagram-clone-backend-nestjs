import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Comment } from "prisma/generated/client";
import { OutputDto } from "src/common/dtos/output.dto";
import { CommentModel } from "src/models/comment.model";

@InputType()
export class CreateCommentInput extends PickType(CommentModel, ['payload']) {
  @Field(type => String)
  photoId: string
}

@ObjectType()
export class CreateCommentOutput extends OutputDto {
  @Field(type => [CommentModel], { nullable: true })
  Comments?: Comment[]
}