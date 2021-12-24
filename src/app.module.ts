import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtMiddleware } from './users/jwt/jwt.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PhotosModule } from './photos/photos.module';
import { CommonModule } from './common/common.module';
import { CommentsModule } from './comments/comments.module';
import { MessagesModule } from './messages/messages.module';

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
    CommonModule,
    CommentsModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
