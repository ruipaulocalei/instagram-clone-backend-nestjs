import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";

@InputType()
export class DeleteCommentInput {
  @Field(type => String)
  commentId: string
}

@ObjectType()
export class DeleteCommentOutput extends OutputDto {

}