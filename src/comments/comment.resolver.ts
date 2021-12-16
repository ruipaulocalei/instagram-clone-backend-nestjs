import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Photo, User } from "prisma/generated/client";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CommentModel } from "src/models/comment.model";
import { CommentsService } from "./comments.service";
import { CreateCommentInput, CreateCommentOutput } from "./dtos/create-comment.dto";

@Resolver(of => CommentModel)
export class CommentResolver {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(AuthGuard)
  @Mutation(returns => CreateCommentOutput)
  createComment(@Args('input') { payload, photo }: CreateCommentInput, @AuthUser() authUser: User) {
    return this.commentsService.createComment(authUser, { payload, photo })
  }
}