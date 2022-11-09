import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TayModule } from './Api/Tay/tay.module';
import { VietTayModule } from './Api/Viet_Tay/viTay.module';
import { VietModule } from './Api/Viet/viet.module';
import { SequenceModule } from './Api/SequenceText/sequence.module';
import { CrawlerModule } from './Api/craw-data/craw-data.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/dictionary'),
        VietModule,
        TayModule,
        VietTayModule,
        SequenceModule,
        CrawlerModule,
    ],
    providers: [],
    controllers: [],
})
export class AppModule {}
