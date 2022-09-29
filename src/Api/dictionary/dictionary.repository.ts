import { Dictionary, DictionaryDocument } from './dictionary.schema';
import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DictionaryRepository extends Repository<DictionaryDocument> {
    constructor(@InjectModel(Dictionary.name) private dictionaryModel: Model<DictionaryDocument>) {
        super(dictionaryModel);
    }
}
