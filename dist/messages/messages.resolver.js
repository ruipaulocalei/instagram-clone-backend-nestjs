"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("../../generated/client");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const output_dto_1 = require("../common/dtos/output.dto");
const message_model_1 = require("../models/message.model");
const rooms_model_1 = require("../models/rooms.model");
const users_model_1 = require("../models/users.model");
const see_room_dto_1 = require("../users/dtos/see-room.dto");
const send_message_dto_1 = require("../users/dtos/send-message.dto");
const messages_service_1 = require("./messages.service");
let MessagesResolver = class MessagesResolver {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async seeRooms(authUser) {
        return this.messagesService.seeRooms(authUser);
    }
    async seeRoom({ roomId }, authUser) {
        return this.messagesService.seeRoom({ id: roomId }, authUser);
    }
    async sendMessage({ payload, roomId, userId }, authUser) {
        return this.messagesService.sendMessage({ payload, roomId, userId }, authUser);
    }
    isMine(message, authUser) {
        if (!authUser) {
            return false;
        }
        return message.userId === authUser.id;
    }
};
__decorate([
    graphql_1.Query(() => [rooms_model_1.RoomModel]),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "seeRooms", null);
__decorate([
    graphql_1.Query(() => rooms_model_1.RoomModel),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, graphql_1.Args('input')),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [see_room_dto_1.SeeRoomInput, users_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "seeRoom", null);
__decorate([
    graphql_1.Mutation(() => output_dto_1.OutputDto),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, graphql_1.Args('input')),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageInput,
        users_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], MessagesResolver.prototype, "sendMessage", null);
__decorate([
    graphql_1.ResolveField(returns => Boolean),
    __param(0, graphql_1.Parent()),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], MessagesResolver.prototype, "isMine", null);
MessagesResolver = __decorate([
    graphql_1.Resolver(of => message_model_1.MessageModel),
    __metadata("design:paramtypes", [messages_service_1.MessagesService])
], MessagesResolver);
exports.MessagesResolver = MessagesResolver;
//# sourceMappingURL=messages.resolver.js.map