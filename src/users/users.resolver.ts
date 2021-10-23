import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { LoginInputDto, LoginOutputDto } from "./dtos/login.dto";
import { SeeProfileOutput } from "./dtos/see-profile.dto";
import { UsersService } from "./users.service";

@Resolver(of => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }
  @Mutation(() => CreateUserOutput)
  async createUser(@Args('input') data: CreateUserInput) {
    return this.usersService.createUser(data)
  }

  @Query(returns => SeeProfileOutput)
  async seeProfile(@Args('input') username: string) {
    return this.usersService.seeProfile({ username })
  }

  @Mutation(() => LoginOutputDto)
  async login(@Args('input') { username, password }: LoginInputDto) {
    return this.usersService.login({ username, password })
  }
}