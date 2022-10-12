import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DictionaryModule } from './Api/Dictionary/dictionary.module';
import { TayModule } from './Api/Tay/tay.module';
import { VietTayModule } from './Api/test/viTay.module';
import { VietModule } from './Api/Viet/viet.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/dictionary'),
        DictionaryModule,
        VietModule,
        TayModule,
        VietTayModule
    ],
    
})
export class AppModule {}
