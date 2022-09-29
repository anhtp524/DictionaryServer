import { DictionaryRepository } from './dictionary.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DictionaryService {
    constructor(private readonly dictionaryRepository: DictionaryRepository) {}

    async getTranslatedString(word: string) {
        return await this.dictionaryRepository.getAllByCondition({ originalWord: word });
    }
}
