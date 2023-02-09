import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWord, UserWordDocument } from './user-word.schema';

@Injectable()
export class userWordRepository extends Repository<UserWordDocument> {
    constructor(@InjectModel(UserWord.name) private userWordModel: Model<UserWordDocument>) {
        super(userWordModel);
    }
}
