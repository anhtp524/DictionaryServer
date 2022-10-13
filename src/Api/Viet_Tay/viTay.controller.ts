import { Controller, Get, Post, Query } from '@nestjs/common';
import { viTayService } from './viTay.service';

@Controller('dictionary')
export class VietTayController {
    constructor(private readonly viTayService: viTayService) {}

    // @Get('add')
    // async create() {
    //     await this.viTayService.create();
    //     //console.log('cho trung anh');
    //     return 'test';
    // }

    @Get('viet')
    translateVietToTay(@Query() { query }: { query: string }) {
        return this.viTayService.getVietToTay(query);
    }

    @Get('tay')
    translateTayToViet(@Query() { query }: { query: string }) {
        return this.viTayService.getTayToViet(query);
    }
}
