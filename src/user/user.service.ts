import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
const jwt = require('jsonwebtoken');
import { validate } from 'class-validator';
import * as crypto from 'crypto';

import { UsersEntity } from './user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRO } from './user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { SECRET } from '../config.example';


@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UsersEntity)
        private readonly UserRepository: Repository<UsersEntity>
    ) { }

    async findAll(): Promise<UsersEntity[]> {
        return await this.UserRepository.find();
    }

    async findOne(loginUserDto: LoginUserDto): Promise<UsersEntity> {
        const findOneOptions = {
            email: loginUserDto.email,
            password: crypto.createHmac('sha256', loginUserDto.password).digest('hex')

        };

        return await this.UserRepository.findOne(findOneOptions);
    }

    private buildUserRO(user: UsersEntity) {

        const userRO = {
            username: user.username,
            email: user.email,
            bio: user.bio,
            token: this.generateJWT(user),
            image: user.image
        };

        return { user: userRO };
    }

    public generateJWT(user) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            exp: exp.getTime() / 1000,
        }, SECRET);
    };


    async create(dto: CreateUserDto): Promise<UserRO> {

        //comprobar que el correo y el nombre de usuario son unicos
        const { username, password, email } = dto;

        const query = await getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.username = :username', { username })
            .orWhere('user.email = :email', { email });

        const user = await query.getOne();

        if (user) //ya existia un usuario con ese nombre o email
        {
            const errors = { usarname: 'Username and email must be unique.' };
            throw new HttpException({ message: 'Input data validation failed', errors }, HttpStatus.BAD_REQUEST);
        }

        //Creamos el nuevo usuario
        let newUser = new UsersEntity();
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.articles = [];

        const errors = await validate(newUser);

        if (errors.length > 0) {
            const _errors = { username: 'Userinput is not valid.' };
            throw new HttpException({ message: 'Input data validation failed', _errors }, HttpStatus.BAD_REQUEST);
        }
        else {
            const savedUser = await this.UserRepository.save(newUser);
            return this.buildUserRO(savedUser);
        }

    }


    async update(id: number, dto: UpdateUserDto): Promise<UsersEntity> {
        let toUpdate = await this.UserRepository.findOne(id);
        delete toUpdate.password;
        delete toUpdate.favorites;

        let updated = Object.assign(toUpdate, dto);
        return await this.UserRepository.save(updated);
    }

    async delete(email: string): Promise<DeleteResult> {
        return await this.UserRepository.delete({ email: email });
    }

    async findById(id: number): Promise<UserRO> {
        const user = await this.UserRepository.findOne(id);

        if (!user) {
            const errors = { User: ' not found ' };
            throw new HttpException({ errors }, 401);
        };

        return this.buildUserRO(user);
    }

    async findByEmail(email: string): Promise<UserRO> {
        const user = await this.UserRepository.findOne({ email: email });
        return this.buildUserRO(user);
    }


}