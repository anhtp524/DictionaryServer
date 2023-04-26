import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { cacheModule } from 'src/Share/cache/cache.module';
import { ElasticSearchModule } from 'src/Share/elasticsearch/elasticsearch.module';
import { jwtModule } from 'src/Share/jwt/jwt.module';
import { UsersModule } from '../users/users.module';
import { VietTayModule } from '../Viet_Tay/viTay.module';
import { UserWordController } from './user-word.controller';
import { userWordRepository } from './user-word.repository';
import { UserWord, userWordSchema } from './user-word.schema';
import { UserWordService } from './user-word.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: UserWord.name, schema: userWordSchema }]),
        UsersModule,
        VietTayModule,
        jwtModule,
        cacheModule,
        ElasticSearchModule,
    ],
    controllers: [UserWordController],
    providers: [UserWordService, userWordRepository],
    exports: [UserWordService],
})
export class UserWordModule {}
