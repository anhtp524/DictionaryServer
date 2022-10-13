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
        const vitays = await this.viTayModel
            .find({})
            .populate({
                path: 'idVi',
                match: {
                    word: wordSearch,
                },
                select: 'word',
            })
            .populate('idTay')
            .exec();
        return vitays.filter((vitay) => {
            return vitay.idVi;
        });
    }
}
