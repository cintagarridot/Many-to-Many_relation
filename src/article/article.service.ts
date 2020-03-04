import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Controller } from '@nestjs/common';

import { ArticleEntity } from './article.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService{

    constructor(
        @InjectRepository(ArticleEntity)
        private readonly ArticleRepository: Repository<ArticleEntity>
    ){ }

    async findAll(): Promise<ArticleEntity[]> {
        return await this.ArticleRepository.find();
      }
}