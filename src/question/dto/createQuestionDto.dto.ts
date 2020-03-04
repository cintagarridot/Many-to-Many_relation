import {IsNotEmpty, IsOptional} from 'class-validator';
import {Category} from "../../category/category.entity";

export class createQuestionDto {

    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    readonly question: string;


}