import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";

@Resolver(of => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }
  @Mutation(() => CreateUserOutput)
  async createUser(@Args('input') data: CreateUserInput) {
    return this.usersService.createUser(data)
  }
  @Query(returns => Boolean)
  hi() {
    return true
  }
}