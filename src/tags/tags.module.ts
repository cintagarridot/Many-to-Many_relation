import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tags.entity';
import { TagService } from './tags.service';
import { tagsController } from './tags.controller';
import { UsersModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([TagEntity]), UsersModule],
    providers: [TagService],
    controllers: [
        tagsController
    ],
    exports: []
})
export class tagModule  {
    public configure(consumer: MiddlewareConsumer){
        
    }
}