import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { Photo } from "generated/client";
import { OutputDto } from "src/common/dtos/output.dto";
import { PhotoModel } from "src/models/photos.model";

@InputType()
export class CreatePhotoInput extends PickType(PhotoModel, ['caption', 'file']) { }

@ObjectType()
export class CreatePhotoOutput extends OutputDto {
  @Field(type => [PhotoModel], { nullable: true })
  photos?: Photo[]
}