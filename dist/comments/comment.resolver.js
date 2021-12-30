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
exports.CommentResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const comment_model_1 = require("../models/comment.model");
const users_model_1 = require("../models/users.model");
const comments_service_1 = require("./comments.service");
const create_comment_dto_1 = require("./dtos/create-comment.dto");
const delete_comment_dto_1 = require("./dtos/delete-comment.dto");
const edit_comment_dto_1 = require("./dtos/edit-comment.dto");
let CommentResolver = class CommentResolver {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    createComment({ payload, photoId }, authUser) {
        return this.commentsService.createComment(authUser, { payload, photoId });
    }
    deleteComment({ commentId }, authUser) {
        return this.commentsService.deleteComment(authUser, { commentId });
    }
    editComment({ commentId, payload }, authUser) {
        return this.commentsService.editComment(authUser, { commentId, payload });
    }
    isMine(comment, authUser) {
        if (!authUser) {
            return false;
        }
        return comment.userId === authUser.id;
    }
};
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => create_comment_dto_1.CreateCommentOutput),
    __param(0, graphql_1.Args('input')),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentInput, Object]),
    __metadata("design:returntype", void 0)
], CommentResolver.prototype, "createComment", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => delete_comment_dto_1.DeleteCommentOutput),
    __param(0, graphql_1.Args('input')),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_comment_dto_1.DeleteCommentInput, Object]),
    __metadata("design:returntype", void 0)
], CommentResolver.prototype, "deleteComment", null);
__decorate([
    common_1.UseGuards(auth_guard_1.AuthGuard),
    graphql_1.Mutation(returns => edit_comment_dto_1.EditCommentOutput),
    __param(0, graphql_1.Args('input')),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [edit_comment_dto_1.EditCommentInput, Object]),
    __metadata("design:returntype", void 0)
], CommentResolver.prototype, "editComment", null);
__decorate([
    graphql_1.ResolveField(returns => Boolean),
    __param(0, graphql_1.Parent()),
    __param(1, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_model_1.UserModel]),
    __metadata("design:returntype", void 0)
], CommentResolver.prototype, "isMine", null);
CommentResolver = __decorate([
    graphql_1.Resolver(of => comment_model_1.CommentModel),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentResolver);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.resolver.js.map