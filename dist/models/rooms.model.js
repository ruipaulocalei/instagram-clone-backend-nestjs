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
exports.RoomModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const message_model_1 = require("./message.model");
const users_model_1 = require("./users.model");
let RoomModel = class RoomModel {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], RoomModel.prototype, "id", void 0);
__decorate([
    graphql_1.Field(type => [message_model_1.MessageModel,], { nullable: true }),
    __metadata("design:type", Array)
], RoomModel.prototype, "messages", void 0);
__decorate([
    graphql_1.Field(type => [users_model_1.UserModel,], { nullable: true }),
    __metadata("design:type", Array)
], RoomModel.prototype, "users", void 0);
__decorate([
    graphql_1.Field(type => Date),
    __metadata("design:type", Date)
], RoomModel.prototype, "createdAt", void 0);
__decorate([
    graphql_1.Field(type => Date),
    __metadata("design:type", Date)
], RoomModel.prototype, "updatedAt", void 0);
RoomModel = __decorate([
    graphql_1.InputType({ isAbstract: true }),
    graphql_1.ObjectType()
], RoomModel);
exports.RoomModel = RoomModel;
//# sourceMappingURL=rooms.model.js.map