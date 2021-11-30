import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { OutputDto } from "src/common/dtos/output.dto";
import { LikeModel } from "src/models/likes.model";

@InputType()
export class LikePhotoInput extends PickType(LikeModel, ['id']) { }

@ObjectType()
export class LikePhotoOutput extends OutputDto { }