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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentOutput = exports.CreateCommentInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("../../../prisma/generated/client");
const output_dto_1 = require("../../common/dtos/output.dto");
const comment_model_1 = require("../../models/comment.model");
let CreateCommentInput = class CreateCommentInput extends graphql_1.PickType(comment_model_1.CommentModel, ['payload']) {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], CreateCommentInput.prototype, "photoId", void 0);
CreateCommentInput = __decorate([
    graphql_1.InputType()
], CreateCommentInput);
exports.CreateCommentInput = CreateCommentInput;
let CreateCommentOutput = class CreateCommentOutput extends output_dto_1.OutputDto {
};
__decorate([
    graphql_1.Field(type => [comment_model_1.CommentModel], { nullable: true }),
    __metadata("design:type", Array)
], CreateCommentOutput.prototype, "Comments", void 0);
CreateCommentOutput = __decorate([
    graphql_1.ObjectType()
], CreateCommentOutput);
exports.CreateCommentOutput = CreateCommentOutput;
//# sourceMappingURL=create-comment.dto.js.map