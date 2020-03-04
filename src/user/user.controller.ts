import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './user.service';
import { UsersEntity } from './user.entity';
import { UserRO } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ValidationPipe } from '../validation.pipe';
import { User } from './user.decotator';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('user')
    async findMe(@User('email') email: string): Promise<UserRO> {
      return await this.userService.findByEmail(email);
    }
  
    @Put('user')
    async update(@User('id') userId: number, @Body('user') userData: UpdateUserDto) {
      return await this.userService.update(userId, userData);
    }
  
    @UsePipes(new ValidationPipe())
    @Post('users')
    async create(@Body('user') userData: CreateUserDto) {
      return this.userService.create(userData);
    }
  
    @Delete('users/:slug')
    async delete(@Param() params) {
      return await this.userService.delete(params.slug);
    }
  
    @UsePipes(new ValidationPipe())
    @Post('users/login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserRO> {
      const _user = await this.userService.findOne(loginUserDto);
  
      const errors = {User: ' not found'};
      if (!_user) throw new HttpException({errors}, 401);
  
      const token = await this.userService.generateJWT(_user);
      const {email, username, bio, image} = _user;
      const user = {email, token, username, bio, image};
      return {user}
    }

}