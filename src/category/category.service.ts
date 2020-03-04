import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Category} from "./category.entity";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    async create(category: Category): Promise<Category>{
        let c = new Category();
        c.id = category.id;
        c.category = category.category;

        return await this.categoryRepository.save(c);
    }

}