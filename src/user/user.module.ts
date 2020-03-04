import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './user.entity';
import { UsersController } from './user.controller';

import { AuthMiddleware } from './auth.middleware';
import { UsersService } from './user.service';
 
@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    providers: [UsersService],
    controllers: [
        UsersController
    ],
    exports: []
})
export class UsersModule implements NestModule{

    public configure(consumer: MiddlewareConsumer){
        consumer
            .apply(AuthMiddleware)
            .forRoutes({path: 'user', method: RequestMethod.GET}, {path: 'user', method: RequestMethod.PUT});
    }

}