import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Message } from "generated/client";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { OutputDto } from "src/common/dtos/output.dto";
import { MessageModel } from "src/models/message.model";
import { RoomModel } from "src/models/rooms.model";
import { UserModel } from "src/models/users.model";
import { SeeRoomInput } from "src/users/dtos/see-room.dto";
import { SendMessageInput } from "src/users/dtos/send-message.dto";
import { MessagesService } from "./messages.service";

@Resolver(of => MessageModel)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) { }
  @Query(() => [RoomModel])
  @UseGuards(AuthGuard)
  async seeRooms(@AuthUser() authUser: UserModel) {
    return this.messagesService.seeRooms(authUser)
  }

  @Query(() => RoomModel)
  @UseGuards(AuthGuard)
  async seeRoom(@Args('input') { roomId }: SeeRoomInput, @AuthUser() authUser: UserModel) {
    return this.messagesService.seeRoom({ id: roomId }, authUser)
  }

  @Mutation(() => OutputDto)
  @UseGuards(AuthGuard)
  async sendMessage(@Args('input') { payload, roomId, userId }: SendMessageInput,
    @AuthUser() authUser: UserModel) {
    return this.messagesService.sendMessage({ payload, roomId, userId }, authUser)
  }

  @ResolveField(returns => Boolean)
  isMine(@Parent() message: Message, @AuthUser() authUser: UserModel) {
    if (!authUser) {
      return false
    }
    return message.userId === authUser.id
  }
}