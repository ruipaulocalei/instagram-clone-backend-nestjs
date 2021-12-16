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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt_1 = require("bcrypt");
const client_1 = require("../../prisma/generated/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const users_model_1 = require("../models/users.model");
const output_dto_1 = require("../common/dtos/output.dto");
const rooms_model_1 = require("../models/rooms.model");
const constants_1 = require("../common/constants");
const graphql_subscriptions_1 = require("graphql-subscriptions");
let UsersService = class UsersService {
    constructor(prisma, pubSub) {
        this.prisma = prisma;
        this.pubSub = pubSub;
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
                    following: true,
                    photos: true
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
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id
                },
            });
            if (!user) {
                return {
                    ok: false,
                    error: 'Utilizador não encontrado'
                };
            }
            return {
                ok: true,
                user
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async me({ id }) {
        try {
            const owner = await this.prisma.user.findUnique({
                where: {
                    id
                }
            });
            return owner;
        }
        catch (error) {
        }
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
    async unfollowUser(id, { username }) {
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
                        disconnect: {
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
    totalFollowers({ id }) {
        return this.prisma.user.count({
            where: {
                following: {
                    some: {
                        id
                    }
                }
            }
        });
    }
    totalPublish({ id }) {
        return this.prisma.photo.count({
            where: {
                userId: id
            }
        });
    }
    totalFollowing({ id }) {
        return this.prisma.user.count({
            where: {
                followers: {
                    some: {
                        id
                    }
                }
            }
        });
    }
    async isFollowing({ id }, user) {
        if (!user) {
            return false;
        }
        const ok = await this.prisma.user.count({
            where: {
                username: user.username,
                following: {
                    some: {
                        id
                    }
                }
            }
        });
        return Boolean(ok);
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
                    messages: true
                }
            });
        }
        catch (error) {
        }
    }
    async users({ id }) {
        try {
            return await this.prisma.room.findMany({
                where: {
                    id
                }
            });
        }
        catch (error) {
        }
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(constants_1.PUB_SUB)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        graphql_subscriptions_1.PubSub])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map