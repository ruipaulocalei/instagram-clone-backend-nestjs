"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePhotoOutput = exports.CreatePhotoInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dtos/output.dto");
const photos_model_1 = require("../../models/photos.model");
let CreatePhotoInput = class CreatePhotoInput extends graphql_1.PickType(photos_model_1.PhotoModel, ['caption', 'file']) {
};
CreatePhotoInput = __decorate([
    graphql_1.InputType()
], CreatePhotoInput);
exports.CreatePhotoInput = CreatePhotoInput;
let CreatePhotoOutput = class CreatePhotoOutput extends output_dto_1.OutputDto {
};
CreatePhotoOutput = __decorate([
    graphql_1.ObjectType()
], CreatePhotoOutput);
exports.CreatePhotoOutput = CreatePhotoOutput;
//# sourceMappingURL=upload-photo.dto%20copy.js.map