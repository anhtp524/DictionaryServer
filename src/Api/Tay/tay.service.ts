import { Injectable } from '@nestjs/common';
import { TayRepository } from './tay.repository';

@Injectable()
export class TayService {
    constructor(private readonly tayRepo: TayRepository) {}

    // async getTranslatedVi(word: string) {
    //     const translatedWord = new RegExp('.*' + word + '.*', 'i')
    //     return await this.tayRepo.getAllByCondition({ originalWord: translatedWord });
    // }

    // async getTranslatedTay(word: string) {
    //     return await this.tayRepo.getAllByCondition({translatedWord: word})
    // }
}
