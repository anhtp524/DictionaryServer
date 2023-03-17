import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import mongoose, { AnyArray, ObjectId } from 'mongoose';
import { ElasticSearchService } from 'src/Share/elasticsearch/elasticsearch.service';
import { Tay } from '../Tay/tay.schema';
import { UserRepository } from '../users/users.repository';
import { Viet } from '../Viet/viet.schema';
import { viTayRepository } from '../Viet_Tay/viTay.repository';
import { Viet_Tay } from '../Viet_Tay/viTay.schema';
import { userWordRepository } from './user-word.repository';
import { UserWord, UserWordDocument } from './user-word.schema';

@Injectable()
export class UserWordService {
    constructor(private readonly userWordRepo: userWordRepository, private readonly userRepo: UserRepository, private readonly viTayRepo: viTayRepository, private readonly esService: ElasticSearchService) { }

    async addWord(userId: string, viet: string, tay:string) {
        const idUser = new mongoose.Types.ObjectId(userId);
        const idWordString = await this.esService.getVietTayId(viet, tay);
        if (!idWordString) {
            throw new HttpException('Can not save this word', 400)
        }
        const idWord = new mongoose.Types.ObjectId(idWordString)
        const userWord = await this.userWordRepo.getOneByCondition({'idUser': idUser,'idWord': idWord})
        if (userWord) {
            throw new HttpException('This user has noted this word' , 400)
        }
        return await this.userWordRepo.create(<UserWordDocument>{'idUser': idUser,'idWord': idWord});
    }

    async deleteUserWord(userId: string, wordId: string){
        const userWord = await this.userWordRepo.getOneByCondition({ 'idUser': userId, 'idWord': wordId })
        if (!userWord) {
            throw new HttpException('Not found this word in user', 400);
        }
        await this.userWordRepo.delete(userWord.id);
        throw new HttpException('Unlike word success', 200)
    }

    async getUserWord(userId: string){
        const userWords = await this.userWordRepo.getUserWord(userId)
        if (userWords.length === 0) {
            throw new HttpException('This user do not note any word' , 400)
        }
        return userWords
    }
}
