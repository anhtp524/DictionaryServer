import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DictionaryController } from './dictionary.controller';
import { DictionaryRepository } from './dictionary.repository';
import { Dictionary, DictionarySchema } from './dictionary.schema';
import { DictionaryService } from './dictionary.service';

@Module({
    imports: [MongooseModule.forFeature([{name: Dictionary.name, schema: DictionarySchema}])],
    controllers: [DictionaryController],
    providers: [DictionaryService, DictionaryRepository]
})
export class DictionaryModule {}
