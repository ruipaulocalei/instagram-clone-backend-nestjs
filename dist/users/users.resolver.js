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
exports.UsersResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const apollo_server_express_1 = require("apollo-server-express");
const client_1 = require("../../prisma/generated/client");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const constants_1 = require("../common/constants");
const output_dto_1 = require("../common/dtos/output.dto");
const message_model_1 = require("../models/message.model");
const rooms_model_1 = require("../models/rooms.model");
const users_model_1 = require("../models/users.model");
const create_user_dto_1 = require("./dtos/create-user.dto");
const edit_profile_dto_1 = require("./dtos/edit-profile.dto");
const follow_user_dto_1 = require("./dtos/follow-user.dto");
const login_dto_1 = require("./dtos/login.dto");
const see_profile_dto_1 = require("./dtos/see-profile.dto");
const users_service_1 = require("./users.service");
let UsersResolver = class UsersResolver {
    constructor(usersService, pubSub) {
        this.usersService = usersService;
        this.pubSub = pubSub;
    }
    async createUser(data) {
        return this.usersService.createUser(data);
    }
    async seeProfile(username) {
        return this.usersService.seeProfile({ username });
    }
    async login({ username, password }) {
        return this.usersService.login({ username, password });
    }
    me(authUser) {
        return authUser;
    }
    async editProfile(authUser, { name, email, password, username }) {
        return this.usersService.editProfile({ id: authUser.id }, { name, email, username, password });
    }
    async followUser(authUser, { username }) {
        return this.usersService.followUser(authUser.id, { username });
    }
    totalFollowing(user) {
        return this.usersService.totalFollowing(user);
    }
    isFollowing(user, authUser) {
        return this.usersService.isFollowing(user, authUser);
    }
    isMe({ id }, authUser) {
        if (!authUser) {
            return false;
        }
        return id === authUser.id;
    }
    totalFollowers(user) {
        return this.usersService.totalFollowers(user);
    }
    users(room) {
        return this.usersService.users(room);
    }
    totalPublish(user) {
        return this.usersService.totalPublish(user);
    }
    async unfollowUser(authUser, { username }) {
        return this.usersService.unfollowUser(authUser.id, { username });
    }
    async myProfile(authUser) {
        return this.usersService.me(authUser);
    }
    ready(roomId) {
        this.pubSub.publish('New_Message', { messageUpdate: roomId });
        return true;
    }
    messageUpdate(roomId) {
        return this.pubSub.asyncIterator(constants_1.NEW_MESSAGE);
    }
    socket(payload) {
        this.pubSub.publish('pub', {
            readySocket: payload
        });
        return true;
    }
    readySocket() {
        return this.pubSub.asyncIterator('pub');
    }
};
__decorate([
    graphql_1.Mutation(() => create_user_dto_1.CreateUserOutput),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    graphql_1.Query(returns => see_profile_dto_1.SeeProfileOutput),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "seeProfile", null);
__decorate([
    graphql_1.Mutation(() => login_dto_1.LoginOutputDto),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginInputDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "login", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => users_model_1.UserModel),
    __param(0, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "me", null);
__decorate([
    graphql_1.Mutation(() => edit_profile_dto_1.EditProfileOutput),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel, edit_profile_dto_1.EditProfileInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "editProfile", null);
__decorate([
    graphql_1.Mutation(() => output_dto_1.OutputDto),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel, follow_user_dto_1.FollowUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "followUser", null);
__decorate([
    graphql_1.ResolveField(type => Number),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "totalFollowing", null);
__decorate([
    graphql_1.ResolveField(type => Boolean),
    __param(0, graphql_1.Parent()),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel, users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "isFollowing", null);
__decorate([
    graphql_1.ResolveField(type => Boolean),
    __param(0, graphql_1.Parent()),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel, users_model_1.UserModel]),
    __metadata("design:returntype", Boolean)
], UsersResolver.prototype, "isMe", null);
__decorate([
    graphql_1.ResolveField(type => Number),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "totalFollowers", null);
__decorate([
    graphql_1.ResolveField(type => [rooms_model_1.RoomModel]),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "users", null);
__decorate([
    graphql_1.ResolveField(type => Number),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "totalPublish", null);
__decorate([
    graphql_1.Mutation(() => output_dto_1.OutputDto),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel, follow_user_dto_1.FollowUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "unfollowUser", null);
__decorate([
    graphql_1.Query(() => users_model_1.UserModel),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "myProfile", null);
__decorate([
    graphql_1.Mutation(returns => Boolean),
    __param(0, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "ready", null);
__decorate([
    graphql_1.Subscription(returns => message_model_1.MessageModel, {
        filter: ({ messageUpdate }, { roomId }, { user }) => {
            console.log(messageUpdate, roomId, user);
            return messageUpdate.roomId === roomId;
        }
    }),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __param(0, graphql_1.Args('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "messageUpdate", null);
__decorate([
    graphql_1.Mutation(returns => Boolean),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "socket", null);
__decorate([
    graphql_1.Subscription(returns => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "readySocket", null);
UsersResolver = __decorate([
    graphql_1.Resolver(of => users_model_1.UserModel),
    __param(1, common_1.Inject(constants_1.PUB_SUB)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        apollo_server_express_1.PubSub])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map