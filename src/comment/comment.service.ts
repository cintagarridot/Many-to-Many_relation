import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService{

    constructor(
        @InjectRepository(Comment)
        private readonly CommentRepository: Repository<Comment>
    ){ }

    async findAll(): Promise<Comment[]> {
        return await this.CommentRepository.find();
      }
}