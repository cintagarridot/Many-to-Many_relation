import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Question} from "./question.entity";
import {Category} from "../category/category.entity";
import {CategoryToQuestion} from "./CategoryToQuestion.entity";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) {}

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.find();
    }

    async create(question: Question): Promise<Question>{
        let q = new Question();
        q.id = question.id;
        q.question = question.question;
        // q.categoryToQuestion = question.categoryToQuestion;

        return await this.questionRepository.save(q);
    }

    async addCategoryToQuestion(id: string, idc: string): Promise<Question>{
        let cToq = new CategoryToQuestion();
        cToq.categoryId = idc;
        cToq.questionId = id;
        cToq.order = 4;

        const q = await this.questionRepository.findOne({id}, { relations: ['categories','categoryToQuestion'] });
        const c = await this.categoryRepository.findOne(idc);
        console.log(q);
        q.categoryToQuestion.push(cToq);
        console.log(c);
        if(!c || !q){
            throw new Error("Error ");
        }
        // cToq.question = q;
        // cToq.category = c;
        // cToq.order = 2;
        // console.log(cToq);
        //
        // q.categoryToQuestion.push(cToq);

        // q.categories.push(c);

        const saved = await this.questionRepository.save(q);
        // const p = await this.questionRepository.findOne({id}, { relations: ['categoryToQuestion'] });
        // console.log(p);
        // const variable = p.categoryToQuestion.forEach( ctq => {
        //     ctq.order = 4;
        //     return ctq;
        // });
        //
        // //p.categoryToQuestion = variable;
        // const saved2 = await this.questionRepository.save(p);
        // return saved2;

        return saved;
    }
}