"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotosModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const users_service_1 = require("../users/users.service");
const photos_resolver_1 = require("./photos.resolver");
const photos_service_1 = require("./photos.service");
let PhotosModule = class PhotosModule {
};
PhotosModule = __decorate([
    common_1.Module({
        providers: [photos_service_1.PhotosService, prisma_service_1.PrismaService, photos_resolver_1.PhotoResolver, users_service_1.UsersService]
    })
], PhotosModule);
exports.PhotosModule = PhotosModule;
//# sourceMappingURL=photos.module.js.map