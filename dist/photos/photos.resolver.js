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
exports.PhotoResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("../../prisma/generated/client");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const photos_model_1 = require("../models/photos.model");
const users_model_1 = require("../models/users.model");
const like_photo_dto_1 = require("./dtos/like-photo.dto");
const upload_photo_dto_1 = require("./dtos/upload-photo.dto");
const photos_service_1 = require("./photos.service");
let PhotoResolver = class PhotoResolver {
    constructor(photosService) {
        this.photosService = photosService;
    }
    uploadPhoto({ file, caption }, authUser) {
        return this.photosService.uploadPhoto({ file, caption }, { id: authUser.id });
    }
    likePhoto({ id }, authUser) {
        return this.photosService.likePhoto({ id }, { id: authUser.id });
    }
    feed(authUser) {
        return this.photosService.feed(authUser);
    }
    numberLikes(photo) {
        return this.photosService.numberLikes(photo.id);
    }
    comments(photo) {
        return this.photosService.comments(photo.id);
    }
    isMine(photo, authUser) {
        if (!authUser) {
            return false;
        }
        return photo.userId === authUser.id;
    }
    isLiked(id, user) {
        return this.photosService.isLiked(id, user);
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => upload_photo_dto_1.CreatePhotoOutput),
    __param(0, graphql_1.Args('input')),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_photo_dto_1.CreatePhotoInput, users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "uploadPhoto", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => like_photo_dto_1.LikePhotoOutput),
    __param(0, graphql_1.Args('input')),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [like_photo_dto_1.LikePhotoInput, users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "likePhoto", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Query(returns => [photos_model_1.PhotoModel]),
    __param(0, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "feed", null);
__decorate([
    graphql_1.ResolveField(returns => Number),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "numberLikes", null);
__decorate([
    graphql_1.ResolveField(returns => Number),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "comments", null);
__decorate([
    graphql_1.ResolveField(returns => Boolean),
    __param(0, graphql_1.Parent()),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "isMine", null);
__decorate([
    graphql_1.ResolveField(type => Boolean),
    __param(0, graphql_1.Parent()),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PhotoResolver.prototype, "isLiked", null);
PhotoResolver = __decorate([
    graphql_1.Resolver(of => photos_model_1.PhotoModel),
    __metadata("design:paramtypes", [photos_service_1.PhotosService])
], PhotoResolver);
exports.PhotoResolver = PhotoResolver;
//# sourceMappingURL=photos.resolver.js.map