
import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Viet, VietDocument } from './viet.schema';


@Injectable()
export class VietRepository extends Repository<VietDocument> {
    constructor(@InjectModel(Viet.name) private vietModel: Model<VietDocument>) {
        super(vietModel);
    }
}
