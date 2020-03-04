import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { tagModule } from './tags/tags.module';
import { ArticleModule } from './article/article.module';
import { UsersModule } from './user/user.module';
import { TagEntity } from './tags/tags.entity';
import { ArticleEntity } from './article/article.entity';
import { Comment } from './comment/comment.entity';
import { UsersEntity } from './user/user.entity';
import {Category} from "./category/category.entity";
import {Question} from "./question/question.entity";
import {CategoryModule} from "./category/category.module";
import {QuestionModule} from "./question/question.module";
import {CategoryToQuestion} from "./question/CategoryToQuestion.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'changeme',
      database: 'nestdemo',
      entities: [TagEntity, ArticleEntity, Comment, UsersEntity, Category, Question, CategoryToQuestion],
      synchronize: true,
    }),
      ArticleModule,
      tagModule,
      UsersModule,
      CategoryModule,
      QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private readonly connection: Connection) {}
}
