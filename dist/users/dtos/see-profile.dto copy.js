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
exports.SeeProfileOutput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const users_model_1 = require("../../models/users.model");
let SeeProfileOutput = class SeeProfileOutput extends output_dto_1.OutputDto {
};
__decorate([
    graphql_1.Field(type => users_model_1.UserModel, { nullable: true }),
    __metadata("design:type", Object)
], SeeProfileOutput.prototype, "profile", void 0);
SeeProfileOutput = __decorate([
    graphql_1.ObjectType()
], SeeProfileOutput);
exports.SeeProfileOutput = SeeProfileOutput;
//# sourceMappingURL=see-profile.dto%20copy.js.map