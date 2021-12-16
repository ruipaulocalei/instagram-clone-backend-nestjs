"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../prisma/generated/client");
const photos_service_1 = require("../photos/photos.service");
const prisma_service_1 = require("../prisma.service");
const users_service_1 = require("../users/users.service");
const comment_resolver_1 = require("./comment.resolver");
const comments_service_1 = require("./comments.service");
let CommentsModule = class CommentsModule {
};
CommentsModule = __decorate([
    common_1.Module({
        providers: [comments_service_1.CommentsService, photos_service_1.PhotosService, users_service_1.UsersService,
            prisma_service_1.PrismaService, comment_resolver_1.CommentResolver]
    })
], CommentsModule);
exports.CommentsModule = CommentsModule;
//# sourceMappingURL=comments.module.js.map