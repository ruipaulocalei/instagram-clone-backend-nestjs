import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { FollowUserInput } from "./dtos/follow-user.dto";
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

  @Query(returns => UserModel)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: UserModel) {
    return authUser
  }

  @Mutation(() => EditProfileOutput)
  @UseGuards(AuthGuard)
  async editProfile(@AuthUser() authUser: UserModel, @Args('input') { name, email, password, username }: EditProfileInput) {
    return this.usersService.editProfile({ id: authUser.id }, { name, email, username, password })
  }

  @Mutation(() => EditProfileOutput)
  @UseGuards(AuthGuard)
  async followUser(@AuthUser() authUser: UserModel, @Args('input') { username }: FollowUserInput) {
    return this.usersService.followUser(authUser.id, { username })
  }
}