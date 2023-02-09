import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TayModule } from './Api/Tay/tay.module';
import { VietTayModule } from './Api/Viet_Tay/viTay.module';
import { VietModule } from './Api/Viet/viet.module';
import { SequenceModule } from './Api/SequenceText/sequence.module';
import { CrawlerModule } from './Api/craw-data/craw-data.module';
import { UsersModule } from './Api/users/users.module';
import { AuthModule } from './Api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/dictionary'),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        VietModule,
        TayModule,
        VietTayModule,
        SequenceModule,
        CrawlerModule,
        UsersModule,
        AuthModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule {}
