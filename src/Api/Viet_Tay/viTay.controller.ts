import { Controller, Get, Post, Query } from '@nestjs/common';
import { viTayService } from './viTay.service';

@Controller('dictionary')
export class VietTayController {
    constructor(private readonly viTayService: viTayService) {}

    // @Get('add')
    // async create() {
    //     await this.viTayService.create();
    //     return 'test';
    // }

    @Get('viet')
    async translateVietToTay(@Query() { query }: { query: string }) {
        const translateWord = await this.viTayService.getVietToTay(query);
        if(translateWord.length !== 0){
            return translateWord;
        }
        
        return this.viTayService.translateSequenceText(query);
    }

    @Get('tay')
    translateTayToViet(@Query() { query }: { query: string }) {
        return this.viTayService.getTayToViet(query);
    }
}
