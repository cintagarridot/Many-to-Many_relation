import { Entity, PrimaryGeneratedColumn, JoinTable, Column, OneToMany, ManyToMany, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';


import { ArticleEntity } from '../article/article.entity';


@Entity('users')
export class UsersEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ default: '' })
    bio: string;

    @Column({ default: '' }) 
    image: string;

    @Column()
    password: string;

   /* @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }
*/
    @ManyToMany(type => ArticleEntity) //Un usuario puede tener muchos articulos favs y esos articulos pueden ser favoritos de muchos usuarios
    @JoinTable() //para unir de otras entidades a esta tabla
    favorites: ArticleEntity[];

    @OneToMany(type => ArticleEntity, article => article.author)
    articles: ArticleEntity[];

}
