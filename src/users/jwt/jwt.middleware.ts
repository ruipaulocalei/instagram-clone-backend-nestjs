import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersService } from "../users.service";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) { }
  async use(req: Request, res: Response, next: NextFunction) {
    if ('jwt-token' in req.headers) {
      const token = req.headers['jwt-token']
      const decoded = verify(token.toString(), 'jhghfvtygh57yghbvrdtugh76ugvhft6')
      try {
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.usersService.findById({ id: decoded['id'] })
          req['user'] = user
        }
      } catch (error) {

      }
    }
    next()
  }
}