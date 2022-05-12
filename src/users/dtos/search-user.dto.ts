import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from 'generated/client';
import { OutputDto } from 'src/common/dtos/output.dto';
import { UserModel } from 'src/models/users.model';

@InputType()
export class SearchUserInput {
  @Field((type) => String)
  query: string;
}

@ObjectType()
export class SearchUserOutput extends OutputDto {
  @Field((type) => [UserModel], { nullable: true })
  users?: User[];
}
