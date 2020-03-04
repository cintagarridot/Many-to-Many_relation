import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Question} from "./question.entity";
import {QuestionController} from "./question.controller";
import {QuestionService} from "./question.service";
import {CategoryService} from "../category/category.service";
import {Category} from "../category/category.entity";
import {CategoryController} from "../category/category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Question, Category])],
    providers: [QuestionService, CategoryService],
    controllers: [
        QuestionController, CategoryController
    ],
    exports: []
})
export class QuestionModule  {
    public configure(consumer: MiddlewareConsumer){

    }
}