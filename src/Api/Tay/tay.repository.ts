
import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tay, TayDocument } from './tay.schema';

@Injectable()
export class TayRepository extends Repository<TayDocument> {
    constructor(@InjectModel(Tay.name) private tayModel: Model<TayDocument>) {
        super(tayModel);
    }
}
