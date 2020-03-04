import {IsNotEmpty, IsOptional} from 'class-validator';
import {Question} from "../../question/question.entity";

export class categoryDto {

    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    readonly question: string;

    @IsOptional()
    readonly questions: Question[];

}