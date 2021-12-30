import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Comment, Photo, User } from "../../generated/client";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CommentModel } from "src/models/comment.model";
import { UserModel } from "src/models/users.model";
import { CommentsService } from "./comments.service";
import { CreateCommentInput, CreateCommentOutput } from "./dtos/create-comment.dto";
import { DeleteCommentInput, DeleteCommentOutput } from "./dtos/delete-comment.dto";
import { EditCommentInput, EditCommentOutput } from "./dtos/edit-comment.dto";

@Resolver(of => CommentModel)
export class CommentResolver {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(AuthGuard)
  @Mutation(returns => CreateCommentOutput)
  createComment(@Args('input') { payload, photoId }: CreateCommentInput, @AuthUser() authUser: User) {
    return this.commentsService.createComment(authUser, { payload, photoId })
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => DeleteCommentOutput)
  deleteComment(@Args('input') { commentId }: DeleteCommentInput, @AuthUser() authUser: User) {
    return this.commentsService.deleteComment(authUser, { commentId })
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => EditCommentOutput)
  editComment(@Args('input') { commentId, payload }: EditCommentInput, @AuthUser() authUser: User) {
    return this.commentsService.editComment(authUser, { commentId, payload })
  }

  @ResolveField(returns => Boolean)
  isMine(@Parent() comment: Comment, @AuthUser() authUser: UserModel) {
    if (!authUser) {
      return false
    }
    return comment.userId === authUser.id
  }
}