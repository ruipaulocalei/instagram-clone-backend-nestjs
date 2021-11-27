import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { PhotoModel } from "src/models/photos.model";
import { UserModel } from "src/models/users.model";
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
}