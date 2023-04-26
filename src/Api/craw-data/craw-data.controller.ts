import { CrawlerService } from './craw-data.service';
import { Controller, Get } from '@nestjs/common';

@Controller('craw-data')
export class CrawlerController {
    constructor(private readonly crawDataService: CrawlerService) {}

    @Get('add')
    async create() {
        return await this.crawDataService.scrape();
    }
}
