"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileOutput = exports.EditProfileInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const users_model_1 = require("../../models/users.model");
let EditProfileInput = class EditProfileInput extends graphql_1.PartialType(graphql_1.PickType(users_model_1.UserModel, ['name', 'email', 'password', 'username', 'avatar', 'bio'])) {
};
EditProfileInput = __decorate([
    graphql_1.InputType()
], EditProfileInput);
exports.EditProfileInput = EditProfileInput;
let EditProfileOutput = class EditProfileOutput extends output_dto_1.OutputDto {
};
EditProfileOutput = __decorate([
    graphql_1.ObjectType()
], EditProfileOutput);
exports.EditProfileOutput = EditProfileOutput;
//# sourceMappingURL=edit-profile.dto.js.map