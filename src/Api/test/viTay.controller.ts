import { Controller, Get, Post, Query } from '@nestjs/common';
import { viTayService } from './viTay.service';

@Controller('test')
export class VietTayController {
    constructor(private readonly viTayService: viTayService) {}

    // @Get('add')
    // async create() {
    //     await this.viTayService.create();
    //     console.log('cho trung anh');
    //     return 'test';
    // }

    @Get()
    getVietToTay(@Query() { query }: { query: string }) {
        return this.viTayService.getVietToTay(query);
    }
}
