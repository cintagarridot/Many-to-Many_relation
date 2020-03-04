import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BeforeUpdate } from 'typeorm';

import { UsersEntity } from '../user/user.entity';
import { Comment } from '../comment/comment.entity';

@Entity('articles')
export class ArticleEntity {


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: '' })
    body: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }

    @Column('simple-array')
    tagList: string[];

    @ManyToOne(type => UsersEntity, user => user.articles)
    author: UsersEntity;

    @OneToMany(type => Comment, comment => comment.article, { eager: true })
    @JoinColumn()
    comments: Comment[]; 

    @Column({ default: 0 })
    favoriteCount: number;




}