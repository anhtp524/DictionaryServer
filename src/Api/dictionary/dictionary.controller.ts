// import { DictionaryService } from './dictionary.service';
// import { Controller, Get, Query } from '@nestjs/common';
// @Controller('dictionary')
// export class DictionaryController {
//     constructor(private readonly dictionarySerivce: DictionaryService) {}

//     @Get('Viet')
//     getTranslatedVi(@Query() {query}: {query: string}) {
//         return this.dictionarySerivce.getTranslatedVi(query);
//     }

//     @Get('Tay')
//     getTranslatedTay(@Query() {query}: {query: string}) {
//         return this.dictionarySerivce.getTranslatedTay(query);
//     }
// }