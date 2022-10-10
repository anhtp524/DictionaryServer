import { DictionaryRepository } from './dictionary.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DictionaryService {
    constructor(private readonly dictionaryRepository: DictionaryRepository) {}

    async getTranslatedVi(word: string) {
        const translatedWord = new RegExp('.*' + word + '.*', 'i')
        return await this.dictionaryRepository.getAllByCondition({ originalWord: translatedWord });
    }

    async getTranslatedTay(word: string) {
        return await this.dictionaryRepository.getAllByCondition({translatedWord: word})
    }
}
