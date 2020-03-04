import {IsNotEmpty, IsOptional} from 'class-validator';
import {Question} from "../../question/question.entity";

export class createCategoryDto {

    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    readonly category: string;

    @IsOptional()
    readonly question: Question[];

}