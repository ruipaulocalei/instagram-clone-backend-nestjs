import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Photo, User } from "prisma/generated/client";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { CommentModel } from "src/models/comment.model";
import { PhotoModel } from "src/models/photos.model";
import { UserModel } from "src/models/users.model";
import { LikePhotoInput, LikePhotoOutput } from "./dtos/like-photo.dto";
import { CreatePhotoInput, CreatePhotoOutput } from "./dtos/upload-photo.dto";
import { PhotosService } from "./photos.service";

@Resolver(of => PhotoModel)
export class PhotoResolver {
  constructor(private readonly photosService: PhotosService) { }

  @UseGuards(AuthGuard)
  @Mutation(returns => CreatePhotoOutput)
  uploadPhoto(@Args('input') { file, caption }: CreatePhotoInput, @AuthUser() authUser: UserModel) {
    return this.photosService.uploadPhoto({ file, caption }, { id: authUser.id })
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => LikePhotoOutput)
  likePhoto(@Args('input') { id }: LikePhotoInput, @AuthUser() authUser: UserModel) {
    return this.photosService.likePhoto({ id }, { id: authUser.id })
  }

  @UseGuards(AuthGuard)
  @Query(returns => [PhotoModel])
  feed(@AuthUser() authUser: UserModel) {
    return this.photosService.feed(authUser)
  }

  @ResolveField(returns => Number)
  numberLikes(@Parent() photo: Photo) {
    return this.photosService.numberLikes(photo.id)
  }

  @ResolveField(returns => Number)
  commentNumber(@Parent() photo: Photo) {
    return this.photosService.commentNumber(photo.id)
  }

  @ResolveField(returns => [CommentModel])
  comments(@Parent() photo: Photo) {
    return this.photosService.comments(photo.id)
  }

  @ResolveField(returns => Boolean)
  isMine(@Parent() photo: Photo, @AuthUser() authUser: UserModel) {
    if (!authUser) {
      return false
    }
    return photo.userId === authUser.id
  }

  @ResolveField(type => Boolean)
  isLiked(@Parent() id: Photo, @AuthUser() user: User,): Promise<boolean> {
    return this.photosService.isLiked(id, user)
  }
}