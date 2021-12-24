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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const apollo_server_express_1 = require("apollo-server-express");
const client_1 = require("../../prisma/generated/client");
const constants_1 = require("../common/constants");
const rooms_model_1 = require("../models/rooms.model");
const users_model_1 = require("../models/users.model");
const prisma_service_1 = require("../prisma.service");
const send_message_dto_1 = require("../users/dtos/send-message.dto");
let MessagesService = class MessagesService {
    constructor(prisma, pubSub) {
        this.prisma = prisma;
        this.pubSub = pubSub;
    }
    async seeRooms({ id }) {
        const room = await this.prisma.room.findMany({
            where: {
                users: {
                    some: {
                        id
                    },
                },
            },
            include: {
                messages: true,
                users: true
            }
        });
        return room;
    }
    async sendMessage({ payload, roomId, userId }, { id }) {
        let room = null;
        try {
            if (userId) {
                const userFind = await this.prisma.user.findUnique({
                    where: {
                        id: userId
                    },
                    select: {
                        id: true
                    }
                });
                if (!userFind) {
                    return {
                        ok: false,
                        error: 'User not found'
                    };
                }
                room = await this.prisma.room.create({
                    data: {
                        users: {
                            connect: [
                                {
                                    id: userId
                                },
                                {
                                    id
                                },
                            ],
                        },
                    }
                });
            }
            if (roomId) {
                room = await this.prisma.room.findUnique({
                    where: {
                        id: roomId
                    }, select: {
                        id: true
                    }
                });
                if (!room) {
                    return {
                        ok: false,
                        error: 'Room not found'
                    };
                }
            }
            const message = await this.prisma.message.create({
                data: {
                    payload,
                    room: {
                        connect: {
                            id: room.id
                        }
                    },
                    user: {
                        connect: {
                            id
                        }
                    }
                }
            });
            this.pubSub.publish(constants_1.NEW_MESSAGE, { messageUpdate: Object.assign({}, message) });
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error: 'Ocorreu um erro inesperado ' + error
            };
        }
    }
    async seeRoom({ id: roomId }, { id }) {
        try {
            return await this.prisma.room.findFirst({
                where: {
                    id: roomId,
                    users: {
                        some: {
                            id
                        }
                    }
                },
                include: {
                    users: true,
                    messages: {
                        include: {
                            user: true
                        }
                    }
                }
            });
        }
        catch (error) {
        }
    }
};
MessagesService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(constants_1.PUB_SUB)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        apollo_server_express_1.PubSub])
], MessagesService);
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map