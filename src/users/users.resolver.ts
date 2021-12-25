import { Inject, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { Prisma, Room } from "@prisma/client";
import { PubSub } from "apollo-server-express";
import { Message, User } from "prisma/generated/client";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { NEW_MESSAGE, PUB_SUB } from "src/common/constants";
import { OutputDto } from "src/common/dtos/output.dto";
import { MessageModel } from "src/models/message.model";
import { RoomModel } from "src/models/rooms.model";
import { UserModel } from "src/models/users.model";
import { CreateUserInput, CreateUserOutput } from "./dtos/create-user.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { FollowUserInput } from "./dtos/follow-user.dto";
import { LoginInputDto, LoginOutputDto } from "./dtos/login.dto";
import { MeOutput } from "./dtos/me.dto";
import { SearchUserInput, SearchUserOutput } from "./dtos/search-convite.dto";
import { SeeProfileOutput } from "./dtos/see-profile.dto";
import { SeeRoomInput } from "./dtos/see-room.dto";
import { SendMessageInput } from "./dtos/send-message.dto";
import { UsersService } from "./users.service";

// const pubsub = new PubSub()
@Resolver(of => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub
  ) { }
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

  @Query(returns => SearchUserOutput)
  async searchUser(@Args('input') { query }: SearchUserInput) {
    return this.usersService.searchUserByUsername({ query })
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
  isFollowing(@Parent() user: UserModel, @AuthUser() authUser: UserModel) {
    return this.usersService.isFollowing(user, authUser)
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

  @ResolveField(type => [RoomModel])
  users(@Parent() room: Room) {
    return this.usersService.users(room)
  }

  @ResolveField(type => Number)
  totalPublish(@Parent() user: UserModel) {
    return this.usersService.totalPublish(user)
  }

  @Mutation(() => OutputDto)
  @UseGuards(AuthGuard)
  async unfollowUser(@AuthUser() authUser: UserModel, @Args('input') { username }: FollowUserInput) {
    return this.usersService.unfollowUser(authUser.id, { username })
  }


  @Query(() => UserModel)
  @UseGuards(AuthGuard)
  async myProfile(@AuthUser() authUser: UserModel) {
    return this.usersService.me(authUser)
  }

  @Mutation(returns => Boolean)
  ready(@Args('roomId') roomId: string) {
    this.pubSub.publish('New_Message', { messageUpdate: roomId })
    return true
  }

  @Subscription(returns => MessageModel, {
    filter: ({ messageUpdate }, { roomId }, { user }) => {
      console.log(messageUpdate, roomId, user)
      return messageUpdate.roomId === roomId
    }
  })
  @UseGuards(AuthGuard)
  messageUpdate(@Args('roomId') roomId: string) {
    // console.log(user)
    return this.pubSub.asyncIterator(NEW_MESSAGE)
  }

  @Mutation(returns => Boolean)
  socket(@Args('input') payload: string) {
    this.pubSub.publish('pub', {
      readySocket: payload
    })
    return true
  }

  @Subscription(returns => String)
  readySocket() {
    return this.pubSub.asyncIterator('pub')
  }

}