import {Body, Controller, Get, Post} from '@nestjs/common';
import {Category} from "./category.entity";
import {CategoryService} from "./category.service";
import {createCategoryDto} from "./dto/createCategoryDto.dto";

@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @Post()
    async create(@Body() category: Category) {
        return this.categoryService.create(category);

    }

}
