import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtMiddleware } from './users/jwt/jwt.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'jwt-token'
        return { token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY] }
      }
    }),
    UsersModule,
    AuthModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
