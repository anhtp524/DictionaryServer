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

    // getVietToTay(wordSearch: string) {
    //     return this.viTayModel
    //         .find({}, 'idVi')
    //         .populate({
    //             path: 'idVi',
    //             match: { word: wordSearch },
    //             select: 'word',
    //         })
    //         .populate('idTay', 'word')
    //         .exec();
    // }

    async getVietToTay(wordSearch: string) {
        const tayWords = await this.viTayModel
            .find({})
            .populate({
                path: 'idVi',
                match: { word: wordSearch },
            })
            .populate('idTay')
            .exec();
        return tayWords.filter((vitay) => {
            return vitay.idVi;
        });
    }

    async getTaytoViet(wordSearch: string) {
        const condition = new RegExp(',?' + wordSearch + ',?', 'i')
        console.log(condition.test('pỏ, pá'));
        
        const vietWords = await this.viTayModel
            .find({})
            .populate({
                path: 'idTay',
                match: { word: condition },
            })
            .populate('idVi')
            .exec();
        return vietWords.filter((vitay) => {
            return vitay.idTay;
        });
    }
}
