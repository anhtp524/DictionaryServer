import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Viet_Tay, viTayDocument } from './viTay.schema';
import { Viet } from '../Viet/viet.schema';
import { Tay } from '../Tay/tay.schema';

@Injectable()
export class viTayRepository extends Repository<viTayDocument> {
    constructor(@InjectModel(Viet_Tay.name) private viTayModel: Model<viTayDocument>) {
        super(viTayModel);
    }

    async translate(wordSearch: string, language: string) {
        try {
            if (language === 'viet') {
                const tayWords = await this.viTayModel
                    .find()
                    .lean()
                    .populate({
                        path: 'idVi',
                        match: { word: wordSearch },
                    })
                    .populate({
                        path: 'idTay',
                    })
                    .exec();
                const word = tayWords.filter((tayWord) => {
                    return tayWord.idVi;
                });
                return word;
            }
            const vietWords = await this.viTayModel
                .find()
                .lean()
                .populate({
                    path: 'idTay',
                    match: { word: wordSearch },
                })
                .populate({
                    path: 'idVi',
                })
                .exec();
            const word = vietWords.filter((vietWord) => {
                return vietWord.idTay;
            });
            return word;
        } catch (err) {
            throw err;
        }
    }

    async getAllVietTay() {
        return await this.viTayModel
            .find()
            .lean()
            .populate({
                path: 'idVi',
            })
            .populate({
                path: 'idTay',
            })
            .exec();
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
