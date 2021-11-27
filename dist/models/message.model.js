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
exports.MessageModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const rooms_model_1 = require("./rooms.model");
const users_model_1 = require("./users.model");
let MessageModel = class MessageModel {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], MessageModel.prototype, "id", void 0);
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], MessageModel.prototype, "payload", void 0);
__decorate([
    graphql_1.Field(type => rooms_model_1.RoomModel, { nullable: true }),
    __metadata("design:type", users_model_1.UserModel)
], MessageModel.prototype, "room", void 0);
__decorate([
    graphql_1.Field(type => users_model_1.UserModel, { nullable: true }),
    __metadata("design:type", users_model_1.UserModel)
], MessageModel.prototype, "user", void 0);
__decorate([
    graphql_1.Field(type => Date),
    __metadata("design:type", Date)
], MessageModel.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(type => Date),
    __metadata("design:type", Date)
], MessageModel.prototype, "updatedAt", void 0);
MessageModel = __decorate([
    graphql_1.InputType({ isAbstract: true }),
    graphql_1.ObjectType()
], MessageModel);
exports.MessageModel = MessageModel;
//# sourceMappingURL=message.model.js.map