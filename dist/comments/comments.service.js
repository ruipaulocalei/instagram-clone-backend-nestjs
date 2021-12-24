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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../prisma/generated/client");
const photos_model_1 = require("../models/photos.model");
const prisma_service_1 = require("../prisma.service");
let CommentsService = class CommentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createComment(user, { payload, photoId: id }) {
        try {
            const photo = await this.prisma.photo.findUnique({
                where: {
                    id
                },
                select: {
                    id: true
                }
            });
            if (!photo) {
                return {
                    ok: false,
                    error: 'Photo not found'
                };
            }
            await this.prisma.comment.create({
                data: {
                    payload,
                    photo: {
                        connect: {
                            id: photo.id
                        }
                    },
                    user: {
                        connect: {
                            id: user.id
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
                error: 'Um erro inesperado ocorreu ' + error
            };
        }
    }
    async deleteComment(user, { commentId }) {
        try {
            const comment = await this.prisma.comment.findUnique({
                where: {
                    id: commentId
                },
                select: {
                    userId: true
                }
            });
            if (!comment) {
                return {
                    ok: false,
                    error: 'Impossible find comment'
                };
            }
            else if (comment.userId !== user.id) {
                return {
                    ok: false,
                    error: 'This comment isn\'t your'
                };
            }
            else {
                await this.prisma.comment.delete({
                    where: {
                        id: commentId
                    }
                });
            }
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
    async editComment(user, { commentId, payload }) {
        try {
            const comment = await this.prisma.comment.findUnique({
                where: {
                    id: commentId
                },
                select: {
                    userId: true
                }
            });
            if (!comment) {
                return {
                    ok: false,
                    error: 'Impossible find comment'
                };
            }
            else if (comment.userId !== user.id) {
                return {
                    ok: false,
                    error: 'This comment isn\'t your'
                };
            }
            else {
                await this.prisma.comment.update({
                    where: {
                        id: commentId
                    },
                    data: {
                        payload
                    }
                });
            }
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
};
CommentsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map