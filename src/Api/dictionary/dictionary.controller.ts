import { DictionaryService } from './dictionary.service';
import { Controller, Get, Query } from '@nestjs/common';
@Controller('dictionary')
export class DictionaryController {
    constructor(private readonly dictionarySerivce: DictionaryService) {}

    @Get()
    getTranslatedString(@Query() query: string) {
        return this.dictionarySerivce.getTranslatedString(query);
    }
}
