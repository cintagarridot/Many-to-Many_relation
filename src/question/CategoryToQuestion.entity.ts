import {Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../category/category.entity";
import {Question} from "./question.entity";

@Entity()
export class CategoryToQuestion {

    @PrimaryGeneratedColumn('uuid')
    CategoryToQuestionId: string;

    @Column({nullable: true})
    public order: number;

    @Column({primary: true, unique: false})
    public questionId: string;

    @Column({primary: true, unique: false})
    public categoryId: string;

    @ManyToOne(type => Category, category => category.categoryToQuestion, {cascade: true})
    @JoinTable()
    category: Category;

    @ManyToOne(type => Question, question => question.categoryToQuestion, {cascade: true})
    @JoinTable()
    question: Question;

}