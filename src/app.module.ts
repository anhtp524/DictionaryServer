import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DictionaryModule } from './Api/Dictionary/dictionary.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/dictionary'),
        DictionaryModule
    ],
    
})
export class AppModule {}
