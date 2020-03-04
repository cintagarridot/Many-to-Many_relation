import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Category} from "./category.entity";
import {CategoryService} from "./category.service";
import {CategoryController} from "./category.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoryService],
    controllers: [
        CategoryController
    ],
    exports: []
})
export class CategoryModule  {
    public configure(consumer: MiddlewareConsumer){

    }
}