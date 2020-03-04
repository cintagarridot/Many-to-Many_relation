import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import {Category} from "../category/category.entity";
import {CategoryToQuestion} from "./CategoryToQuestion.entity";

@Entity('questions')
export class Question {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    question: string;

    @ManyToMany(type => Category, category => category.question, {cascade: true})
    @JoinTable({
        name: 'category_to_question',
        joinColumn: {name: 'questionId', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'categoryId', referencedColumnName: 'id'}
    })
    public categories: Category[];

    @OneToMany(type => CategoryToQuestion, categoryToQuestion => categoryToQuestion.question, )
    public categoryToQuestion: CategoryToQuestion[];

}