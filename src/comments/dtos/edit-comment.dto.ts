import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { CreateCommentInput } from "./create-comment.dto";

@InputType()
export class EditCommentInput extends PickType(CreateCommentInput, ['payload']) {
  @Field(type => String)
  commentId: string
}

@ObjectType()
export class EditCommentOutput extends OutputDto {

}