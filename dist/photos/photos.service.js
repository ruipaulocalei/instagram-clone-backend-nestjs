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
exports.PhotosService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../prisma/generated/client");
const photos_model_1 = require("../models/photos.model");
const prisma_service_1 = require("../prisma.service");
let PhotosService = class PhotosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async uploadPhoto({ file, caption }, { id }) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id
                }
            });
            if (!user) {
                return {
                    ok: false,
                    error: 'Utilizador não encontrado'
                };
            }
            await this.prisma.photo.create({
                data: {
                    file,
                    caption,
                    user: {
                        connect: {
                            id
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
                error: 'Um erro inesperado ocorreu'
            };
        }
    }
    async likePhoto({ id: photoId }, { id: userId }) {
        try {
            const photo = await this.prisma.photo.findUnique({
                where: {
                    id: photoId
                }
            });
            if (!photo) {
                return {
                    ok: false,
                    error: 'Imagem não encontrada'
                };
            }
            const likeObject = {
                photoId_userId: {
                    photoId: photo.id,
                    userId
                }
            };
            const like = await this.prisma.like.findUnique({
                where: likeObject
            });
            if (like) {
                await this.prisma.like.delete({
                    where: likeObject
                });
                return {
                    ok: true
                };
            }
            await this.prisma.like.create({
                data: {
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    photo: {
                        connect: {
                            id: photo.id
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
                error: 'Um erro inesperado ocorreu'
            };
        }
    }
    async feed(user) {
        return await this.prisma.photo.findMany({
            where: {
                OR: [
                    {
                        user: {
                            followers: {
                                some: {
                                    id: user.id
                                }
                            }
                        }
                    },
                    {
                        userId: user.id
                    }
                ]
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                user: true
            },
        });
    }
    numberLikes(photo) {
        return this.prisma.like.count({
            where: {
                photoId: photo
            },
        });
    }
    comments(photo) {
        return this.prisma.comment.count({
            where: {
                photoId: photo
            },
        });
    }
    async isLiked({ id: photoId }, { id: userId }) {
        if (!userId) {
            return false;
        }
        const ok = await this.prisma.like.findUnique({
            where: {
                photoId_userId: {
                    photoId,
                    userId
                }
            },
        });
        if (ok) {
            return true;
        }
        return false;
    }
};
PhotosService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PhotosService);
exports.PhotosService = PhotosService;
//# sourceMappingURL=photos.service.js.map