import { Controller, Get, Query } from '@nestjs/common';
import { TayService } from './tay.service';
@Controller('dictionary')
export class TayController {
    constructor(private readonly tayService: TayService) {}

    @Get('Viet')
    getTranslatedVi(@Query() {query}: {query: string}) {
        return this.tayService.getTranslatedVi(query);
    }

    @Get('Tay')
    getTranslatedTay(@Query() {query}: {query: string}) {
        return this.tayService.getTranslatedTay(query);
    }
}