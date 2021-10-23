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
exports.CreateConviteDtoOutput = exports.CreateProductDtoInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
let CreateProductDtoInput = class CreateProductDtoInput {
};
__decorate([
    graphql_1.Field(type => String),
    __metadata("design:type", String)
], CreateProductDtoInput.prototype, "name", void 0);
CreateProductDtoInput = __decorate([
    graphql_1.InputType()
], CreateProductDtoInput);
exports.CreateProductDtoInput = CreateProductDtoInput;
let CreateConviteDtoOutput = class CreateConviteDtoOutput extends output_dto_1.OutputDto {
};
CreateConviteDtoOutput = __decorate([
    graphql_1.ObjectType()
], CreateConviteDtoOutput);
exports.CreateConviteDtoOutput = CreateConviteDtoOutput;
//# sourceMappingURL=create-convite.dto.js.map