import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArticleEntity } from '../article/article.entity';

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;
  
    @ManyToOne(type => ArticleEntity, article => article.comments)
    article: ArticleEntity;
}
