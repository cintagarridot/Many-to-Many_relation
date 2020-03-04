import {Body, Controller, Get, Param, Post, Put} from '@nestjs/common';
import {Question} from "./question.entity";
import {QuestionService} from "./question.service";
import {createQuestionDto} from "./dto/createQuestionDto.dto";
import {Category} from "../category/category.entity";
import {questionDto} from "./dto/question.dto";

@Controller('question')
export class QuestionController {

    constructor(private readonly questionService: QuestionService) {}

    @Get()
    async findAll(): Promise<Question[]> {
        return await this.questionService.findAll();
    }

    @Post()
    async create(@Body() question: Question) {
        return this.questionService.create(question);
    }

    @Put('/:id/category/:category')
    async addCategoryToQuestion(@Param('id') id, @Param('category') category: string): Promise<Question>{
        return this.questionService.addCategoryToQuestion(id, category);
    }


}
