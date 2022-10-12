import { Controller, Get, Query } from '@nestjs/common';
import { VietService } from './viet.service';

@Controller('dictionary')
export class VietController {
    constructor(private readonly vietService: VietService) {}

    @Get('Viet')
    getTranslatedVi(@Query() {query}: {query: string}) {
        return this.vietService.getTranslatedVi(query);
    }

    @Get('Tay')
    getTranslatedTay(@Query() {query}: {query: string}) {
        return this.vietService.getTranslatedTay(query);
    }
}