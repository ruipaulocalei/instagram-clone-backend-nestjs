import { Field, InputType, ObjectType } from "@nestjs/graphql";
// import { MutationOutput } from "./output.dto";

@InputType()
export class PaginationInput {
  @Field(type => Number, { defaultValue: 1 })
  page: number
}

// @ObjectType()
// export class PaginationOutput extends MutationOutput {
//   @Field(type => Number, { nullable: true })
//   totalPages?: number
//   @Field(type => Number, { nullable: true })
//   totalResults?: number
// }