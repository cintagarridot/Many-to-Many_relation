import {Entity, PrimaryGeneratedColumn, Column, BeforeInsert} from "typeorm";

@Entity('tags')
export class TagEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tag: string;

}