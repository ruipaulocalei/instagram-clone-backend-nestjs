import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { OutputDto } from "src/common/dtos/output.dto";
import { RoomModel } from "src/models/rooms.model";
import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { FollowUserInput } from "./dtos/follow-user.dto";
import { LoginInputDto, LoginOutputDto } from "./dtos/login.dto";
import { MeOutput } from "./dtos/me.dto";
import { SeeProfileOutput } from "./dtos/see-profile.dto";
import { SendMessageInput } from "./dtos/send-message.dto";
import { UsersService } from "./users.service";

const pubsub = new PubSub()
@Resolver(of => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }
  @Mutation(() => CreateUserOutput)
  async createUser(@Args('input') data: CreateUserInput) {
    return this.usersService.createUser(data)
  }

  @Query(returns => SeeProfileOutput)
  @UseGuards(AuthGuard)
  async seeProfile(@Args('input') username: string) {
    return this.usersService.seeProfile({ username })
  }

  @Mutation(() => LoginOutputDto)
  async login(@Args('input') { username, password }: LoginInputDto) {
    return this.usersService.login({ username, password })
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserModel)
  me(@AuthUser() authUser: UserModel) {
    return authUser
  }

  @Mutation(() => EditProfileOutput)
  @UseGuards(AuthGuard)
  async editProfile(@AuthUser() authUser: UserModel, @Args('input') { name, email, password, username }: EditProfileInput) {
    return this.usersService.editProfile({ id: authUser.id }, { name, email, username, password })
  }

  @Mutation(() => OutputDto)
  @UseGuards(AuthGuard)
  async followUser(@AuthUser() authUser: UserModel, @Args('input') { username }: FollowUserInput) {
    return this.usersService.followUser(authUser.id, { username })
  }

  @ResolveField(type => Number)
  totalFollowing(@Parent() user: UserModel) {
    return this.usersService.totalFollowing(user)
  }

  @ResolveField(type => Boolean)
  isFollowing(@Parent() user: UserModel): boolean {
    return false
  }

  @ResolveField(type => Boolean)
  isMe(@Parent() { id }: UserModel, @AuthUser() authUser: UserModel): boolean {
    if (!authUser) {
      return false
    }
    return id === authUser.id
  }

  @ResolveField(type => Number)
  totalFollowers(@Parent() user: UserModel) {
    return this.usersService.totalFollowers(user)
  }

  @Mutation(() => OutputDto)
  @UseGuards(AuthGuard)
  async unfollowUser(@AuthUser() authUser: UserModel, @Args('input') { username }: FollowUserInput) {
    return this.usersService.unfollowUser(authUser.id, { username })
  }

  @Query(() => RoomModel)
  @UseGuards(AuthGuard)
  async seeRooms(@AuthUser() authUser: UserModel) {
    return this.usersService.seeRooms(authUser)
  }

  @Query(() => UserModel)
  @UseGuards(AuthGuard)
  async myProfile(@AuthUser() authUser: UserModel) {
    return this.usersService.me(authUser)
  }

  @Mutation(() => OutputDto)
  @UseGuards(AuthGuard)
  async sendMessage(@Args('input') { payload, roomId, userId }: SendMessageInput, @AuthUser() authUser: UserModel) {
    return this.usersService.sendMessage({ payload, roomId, userId }, authUser)
  }

  @Mutation(returns => Boolean)
  ready() {
    pubsub.publish('New_Message', { messageUpdate: 'Its ready RPC' })
  }

  @Subscription(returns => String)
  messageUpdate(@AuthUser() user: UserModel) {
    console.log(user)
    return pubsub.asyncIterator('New_Message')
  }

}