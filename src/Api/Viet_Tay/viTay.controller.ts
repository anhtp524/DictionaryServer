import { Controller, Get, Post, Query } from '@nestjs/common';
import { viTayService } from './viTay.service';

@Controller('dictionary')
export class VietTayController {
    constructor(private readonly viTayService: viTayService) {}

    @Get('add')
    async create() {
        await this.viTayService.create();
        return 'test';
    }

    // @Get('tay')
    // translateTayToViet(@Query() { query }: { query: string }) {
    //     return this.viTayService.getTayToViet(query);
    // }
}
