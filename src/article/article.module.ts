import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '../comment/comment.entity';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';
import { UsersEntity } from '../user/user.entity';
import { UsersModule } from 'src/user/user.module';
import { ArticleController } from './article.controller';
import { AuthMiddleware } from '../user/auth.middleware';
import {UsersService} from "../user/user.service";
import {UsersController} from "../user/user.controller";

@Module({

    imports: [TypeOrmModule.forFeature([ArticleEntity, Comment, UsersEntity]), UsersModule],
    providers: [ArticleService, UsersService],
    controllers: [
        ArticleController, UsersController
    ]


})

export class ArticleModule implements NestModule {

    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'articles/feed', method: RequestMethod.GET },
                { path: 'articles', method: RequestMethod.POST },
                { path: 'articles/:slug', method: RequestMethod.DELETE },
                { path: 'articles/:slug', method: RequestMethod.PUT },
                { path: 'articles/:slug/comments', method: RequestMethod.POST },
                { path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE },
                { path: 'articles/:slug/favorite', method: RequestMethod.POST },
                { path: 'articles/:slug/favorite', method: RequestMethod.DELETE });
    }


}