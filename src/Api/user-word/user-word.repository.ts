import { Repository } from 'src/Share/Database/repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserWord, UserWordDocument } from './user-word.schema';
import { Viet_Tay } from '../Viet_Tay/viTay.schema';
import { Viet } from '../Viet/viet.schema';
import { Tay } from '../Tay/tay.schema';

@Injectable()
export class userWordRepository extends Repository<UserWordDocument> {
    constructor(
        @InjectModel(UserWord.name)
        private userWordModel: Model<UserWordDocument>,
    ) {
        super(userWordModel);
    }

    async getUserWord(userId: string) {
        const userWords = await this.userWordModel
            .find({ idUser: userId })
            .lean()
            .populate({
                path: 'idWord',
                populate: [
                    {
                        path: 'idVi',
                    },
                    {
                        path: 'idTay',
                    },
                ],
            });
        const arr = [];
        userWords.filter((userWord) => {
            arr.push({
                viet: ((userWord.idWord as unknown as Viet_Tay).idVi as unknown as Viet).word,
                tay: ((userWord.idWord as unknown as Viet_Tay).idTay as unknown as Tay).word,
                description: ((userWord.idWord as unknown as Viet_Tay).idTay as unknown as Tay).description,
                level: userWord.level,
            });
        });
        return arr;
    }
}
