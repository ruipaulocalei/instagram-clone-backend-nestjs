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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("bcrypt");
const client_1 = require("../../prisma/generated/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../models/users.model");
const output_dto_1 = require("../common/dtos/output.dto");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser({ email, password, username, name }) {
        try {
            const userExists = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            email
                        },
                        {
                            username
                        }
                    ]
                }
            });
            if (userExists) {
                return {
                    ok: false,
                    error: 'User already exists'
                };
            }
            const hashedPassword = await bcrypt_1.hash(password, 10);
            await this.prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    username
                }
            });
            return {
                ok: true
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'An error occured. Try again...'
            };
        }
    }
    async seeProfile({ username }) {
        try {
            const userExists = await this.prisma.user.findUnique({
                where: {
                    username
                },
                include: {
                    followers: true,
                    following: true
                }
            });
            if (!userExists) {
                return {
                    ok: false,
                    error: 'This user does not exist.'
                };
            }
            return {
                ok: true,
                profile: userExists
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'An error occured.'
            };
        }
    }
    async login({ username, password }) {
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    username
                }
            });
            if (!user) {
                return {
                    ok: false,
                    error: 'User does not exists'
                };
            }
            const passwordDb = await bcrypt_1.compare(password, user.password);
            if (!passwordDb) {
                return {
                    ok: false,
                    error: 'Password wrong'
                };
            }
            const token = jsonwebtoken_1.sign({ id: user.id }, 'jhghfvtygh57yghbvrdtugh76ugvhft6');
            return {
                ok: true,
                token
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'An error occured'
            };
        }
    }
    async findById({ id }) {
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }
    async editProfile({ id }, { email, name, password: newPassword, username }) {
        try {
            let hashedPassword = null;
            if (newPassword) {
                hashedPassword = await bcrypt_1.hash(newPassword, 10);
            }
            const user = await this.prisma.user.update({
                where: {
                    id
                },
                data: Object.assign({ email,
                    name,
                    username }, (hashedPassword && { password: hashedPassword }))
            });
            if (user.id) {
                return {
                    ok: true,
                };
            }
            return {
                ok: false,
                error: 'Erro ao actualizar o teu perfil',
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'Ocorreu um erro inesperado. Tente novamente',
            };
        }
    }
    async followUser(id, { username }) {
        try {
            const user = await this.prisma.user.findUnique({ where: { username } });
            if (!user) {
                return {
                    ok: false,
                    error: 'This user does not exists'
                };
            }
            await this.prisma.user.update({
                where: {
                    id
                },
                data: {
                    following: {
                        connect: {
                            username
                        }
                    }
                }
            });
            return {
                ok: true
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'An error occured. Try again!...'
            };
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map