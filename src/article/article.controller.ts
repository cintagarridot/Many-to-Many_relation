import { Controller, Get } from '@nestjs/common';

import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {

    constructor(private readonly ArticleService: ArticleService){
    }

    @Get()
    findAll(): Promise<ArticleEntity[]>{
        return this.ArticleService.findAll();
    }


}