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
var UserModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const photos_model_1 = require("./photos.model");
let UserModel = UserModel_1 = class UserModel {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], UserModel.prototype, "id", void 0);
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], UserModel.prototype, "username", void 0);
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], UserModel.prototype, "name", void 0);
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "bio", void 0);
__decorate([
    graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], UserModel.prototype, "avatar", void 0);
__decorate([
    graphql_1.Field(type => [UserModel_1], { nullable: true }),
    __metadata("design:type", Array)
], UserModel.prototype, "following", void 0);
__decorate([
    graphql_1.Field(type => [UserModel_1], { nullable: true }),
    __metadata("design:type", Array)
], UserModel.prototype, "followers", void 0);
__decorate([
    graphql_1.Field(type => [photos_model_1.PhotoModel], { nullable: true }),
    __metadata("design:type", Array)
], UserModel.prototype, "photos", void 0);
__decorate([
    graphql_1.Field(type => Date),
    __metadata("design:type", Date)
], UserModel.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(type => Date),
    __metadata("design:type", Date)
], UserModel.prototype, "updatedAt", void 0);
UserModel = UserModel_1 = __decorate([
    graphql_1.InputType({ isAbstract: true }),
    graphql_1.ObjectType()
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=users.model.js.map