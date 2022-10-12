
import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Viet_Tay, viTayDocument } from './viTay.schema';

@Injectable()
export class viTayRepository extends Repository<viTayDocument> {
    constructor(@InjectModel(Viet_Tay.name) private viTayModel: Model<viTayDocument>) {
        super(viTayModel);
    }

    getVietToTay(wordSearch: string) {
        return this.viTayModel.findOne({},"idVi").populate({
            path: "idVi",
            match: {word: wordSearch},
            select: 'word'
        }).populate("idTay", "word").exec()
    }
}
