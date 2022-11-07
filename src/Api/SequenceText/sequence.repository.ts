import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sequence, sequenceDocument } from './sequence.schema';


@Injectable()
export class SequenceRepository extends Repository<sequenceDocument> {
    constructor(@InjectModel(Sequence.name) private sequenceModel: Model<sequenceDocument>) {
        super(sequenceModel);
    }
}
