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
exports.SendMessageOutput = exports.SendMessageInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const message_model_1 = require("../../models/message.model");
const users_model_1 = require("../../models/users.model");
let SendMessageInput = class SendMessageInput {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], SendMessageInput.prototype, "payload", void 0);
__decorate([
    graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], SendMessageInput.prototype, "roomId", void 0);
__decorate([
    graphql_1.Field(type => String, { nullable: true }),
    __metadata("design:type", String)
], SendMessageInput.prototype, "userId", void 0);
SendMessageInput = __decorate([
    graphql_1.InputType()
], SendMessageInput);
exports.SendMessageInput = SendMessageInput;
let SendMessageOutput = class SendMessageOutput extends output_dto_1.OutputDto {
};
SendMessageOutput = __decorate([
    graphql_1.ObjectType()
], SendMessageOutput);
exports.SendMessageOutput = SendMessageOutput;
//# sourceMappingURL=send-message.dto.js.map