import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import mongoose, { ObjectId } from 'mongoose';
import { UserRepository } from '../users/users.repository';
import { viTayRepository } from '../Viet_Tay/viTay.repository';
import { userWordRepository } from './user-word.repository';
import { UserWord, UserWordDocument } from './user-word.schema';

@Injectable()
export class UserWordService {
    constructor(private readonly userWordRepo: userWordRepository, private readonly userRepo: UserRepository, private readonly viTayRepo: viTayRepository) { }
    
    async addWord(userId: string, wordId: string) {
        const idUser = new mongoose.Types.ObjectId(userId);
        const idWord = new mongoose.Types.ObjectId(wordId)
        const userWord = await this.userWordRepo.getOneByCondition({'idUser': idUser,'idWord': idWord})
        if (userWord) {
            throw new HttpException('This user has noted this word' , 400)
        }
        const word = await this.viTayRepo.getOneByCondition({ '_id': idWord })
        if (!word) {
            throw new HttpException('Not found this word', 404)
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
}
