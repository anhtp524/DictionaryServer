import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import mongoose from 'mongoose';
import { ElasticSearchService } from 'src/Share/elasticsearch/elasticsearch.service';
import { UserRepository } from '../users/users.repository';
import { viTayRepository } from '../Viet_Tay/viTay.repository';
import { userWordRepository } from './user-word.repository';
import { UserWordDocument } from './user-word.schema';

@Injectable()
export class UserWordService {
    constructor(
        private readonly userWordRepo: userWordRepository,
        private readonly userRepo: UserRepository,
        private readonly viTayRepo: viTayRepository,
        private readonly esService: ElasticSearchService,
    ) {}

    async addWord(userId: string, viet: string, tay: string, level: string) {
        const idWordString = await this.esService.getVietTayId(viet, tay);
        const userWord = await this.userWordRepo.getOneByCondition({
            idUser: userId,
            idWord: idWordString,
        });
        if (userWord) {
            throw new HttpException('This user has noted this word', 400);
        }
        return await this.userWordRepo.create(<UserWordDocument>{
            idUser: new mongoose.Types.ObjectId(userId),
            idWord: new mongoose.Types.ObjectId(idWordString),
            level: level,
        });
    }

    async deleteUserWord(userId: string, viet: string, tay: string) {
        const idWordString = await this.esService.getVietTayId(viet, tay);
        const userWord = await this.userWordRepo.getOneByCondition({
            idUser: userId,
            idWord: idWordString,
        });
        if (!userWord) {
            throw new HttpException('Not found this word in user', 400);
        }
        await this.userWordRepo.delete(userWord.id);
        throw new HttpException('Unlike word success', 200);
    }

    async getUserWord(userId: string) {
        const userWords = await this.userWordRepo.getUserWord(userId);
        if (userWords.length === 0) {
            throw new HttpException('This user do not note any word', 400);
        }
        return userWords;
    }
}
