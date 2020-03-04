import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from "typeorm";
import {CategoryToQuestion} from "../question/CategoryToQuestion.entity";
import {Question} from "../question/question.entity";

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    category: string;

    @ManyToMany(type => Question, question => question.categories, )
    question: Question[];

    @OneToMany(type => CategoryToQuestion, categoryToQuestion => categoryToQuestion.category, )
    public categoryToQuestion: CategoryToQuestion[];


}