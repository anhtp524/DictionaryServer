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

    async getVietToTay(wordSearch: string) {
        const tayWords = await this.viTayModel
            .find({})
            .populate({
                path: 'idVi',
                match: { word: wordSearch },
                select: "word"
            })
            .populate('idTay')
            .exec();
        return tayWords.filter((tayWord) => {
            return tayWord.idVi;
        });
    }

    async getTaytoViet(wordSearch: string) {
        const vietWords = await this.viTayModel
            .find({})
            .populate({
                path: 'idTay',
                match: { word: wordSearch },
            })
            .populate('idVi')
            .exec();
        return vietWords.filter((vietWord) => {
            return vietWord.idTay;
        });
    }
}
