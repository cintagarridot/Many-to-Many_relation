import { Controller, Get, Req } from '@nestjs/common';

import { TagService } from './tags.service';
import { TagEntity } from './tags.entity';


@Controller('tags')
export class tagsController {

    constructor(private readonly tagService: TagService) {}

    @Get()
    async findAll(): Promise<TagEntity[]> {
        return await this.tagService.findAll();
    }


}
