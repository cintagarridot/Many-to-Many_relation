import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from '../comment/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({

    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService],
    controllers: [
        CommentController
    ]


})

export class CommentModule implements NestModule {

    public configure(consumer: MiddlewareConsumer) {
        consumer
            /*.apply(AuthMiddleware)
            .forRoutes(
                { path: 'articles/feed', method: RequestMethod.GET },
                { path: 'articles', method: RequestMethod.POST },
                { path: 'articles/:slug', method: RequestMethod.DELETE },
                { path: 'articles/:slug', method: RequestMethod.PUT },
                { path: 'articles/:slug/comments', method: RequestMethod.POST },
                { path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE },
                { path: 'articles/:slug/favorite', method: RequestMethod.POST },
                { path: 'articles/:slug/favorite', method: RequestMethod.DELETE });*/
    }


}