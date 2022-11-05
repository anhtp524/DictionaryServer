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
        
        return this.viTayService.translateSequenceTextVietnamToTay(query);
    }

    @Get('tay')
    async translateTayToViet(@Query() { query }: { query: string }) {
        const translateWord = await this.viTayService.getTayToViet(query);
        if(translateWord.length !== 0){
            return translateWord;
        }
        
        return this.viTayService.translateSequenceTextTayToVietnam(query);
    }
}
