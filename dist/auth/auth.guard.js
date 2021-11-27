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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const jsonwebtoken_1 = require("jsonwebtoken");
const users_service_1 = require("../users/users.service");
let AuthGuard = class AuthGuard {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async canActivate(context) {
        const gqlContext = graphql_1.GqlExecutionContext.create(context).getContext();
        const token = gqlContext.token;
        if (token) {
            const decoded = jsonwebtoken_1.verify(token.toString(), 'jhghfvtygh57yghbvrdtugh76ugvhft6');
            if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                const { user } = await this.usersService.findById({ id: decoded['id'] });
                if (!user) {
                    return false;
                }
                else {
                    gqlContext['user'] = user;
                    return true;
                }
            }
        }
        else {
            return false;
        }
    }
};
AuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map