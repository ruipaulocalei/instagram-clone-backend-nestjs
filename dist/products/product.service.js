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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const product_model_1 = require("../models/product.model");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createProduct({ name }) {
        try {
            const nameExists = await this.prisma.product.findUnique({
                where: {
                    name
                }
            });
            if (nameExists) {
                return {
                    ok: false,
                    error: 'The name was already taken'
                };
            }
            await this.prisma.product.create({
                data: {
                    name
                }
            });
            return {
                ok: true
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'An error occured'
            };
        }
    }
    async products() {
        return await this.prisma.product.findMany();
    }
};
ProductService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map