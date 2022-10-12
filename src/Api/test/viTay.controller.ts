import { Controller, Get, Post, Query } from '@nestjs/common';
import { viTayService } from './viTay.service';

@Controller('test')
export class VietTayController {
    constructor(private readonly viTayService: viTayService) {}

    // @Get()
    // async create() {
    //     await this.viTayService.create()
    //     return "test"
    // }

    @Get()
    async getVietToTay(@Query() {query}: {query: string}) {
        return this.viTayService.getVietToTay(query)
    }

}