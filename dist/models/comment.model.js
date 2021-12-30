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
var CommentModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("../../generated/client");
const photos_model_1 = require("./photos.model");
const users_model_1 = require("./users.model");
let CommentModel = CommentModel_1 = class CommentModel {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], CommentModel.prototype, "id", void 0);
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], CommentModel.prototype, "payload", void 0);
__decorate([
    graphql_1.Field(type => photos_model_1.PhotoModel),
    __metadata("design:type", Object)
], CommentModel.prototype, "photo", void 0);
__decorate([
    graphql_1.Field(type => users_model_1.UserModel),
    __metadata("design:type", Object)
], CommentModel.prototype, "user", void 0);
__decorate([
    graphql_1.Field(type => [CommentModel_1]),
    __metadata("design:type", Array)
], CommentModel.prototype, "comments", void 0);
__decorate([
    graphql_1.Field(type => Date),
    __metadata("design:type", Date)
], CommentModel.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(type => Date),
    __metadata("design:type", Date)
], CommentModel.prototype, "updatedAt", void 0);
CommentModel = CommentModel_1 = __decorate([
    graphql_1.InputType({ isAbstract: true }),
    graphql_1.ObjectType()
], CommentModel);
exports.CommentModel = CommentModel;
//# sourceMappingURL=comment.model.js.map