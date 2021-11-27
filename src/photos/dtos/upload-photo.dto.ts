import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { PhotoModel } from "src/models/photos.model";

@InputType()
export class CreatePhotoInput extends PickType(PhotoModel, ['caption', 'file']) { }

@ObjectType()
export class CreatePhotoOutput extends OutputDto { }