import { Controller, Get } from '@nestjs/common';

import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {

    constructor(private readonly CommentService: CommentService){
    }

    @Get()
    findAll(): Promise<Comment[]>{
        return this.CommentService.findAll();
    }


}