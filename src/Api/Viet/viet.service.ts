import { Injectable } from '@nestjs/common';
import { VietRepository } from './viet.repository';

@Injectable()
export class VietService {
    constructor(private readonly vietRepo: VietRepository) {}

    // async getTranslatedVi(word: string) {
    //     const translatedWord = new RegExp('.*' + word + '.*', 'i')
    //     return await this.vietRepo.getAllByCondition({ originalWord: translatedWord });
    // }

    // async getTranslatedTay(word: string) {
    //     return await this.vietRepo.getAllByCondition({translatedWord: word})
    // }
}
