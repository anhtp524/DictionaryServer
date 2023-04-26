import { CrawlerController } from './craw-data.controller';
import { Module } from '@nestjs/common';
import { NestCrawlerModule } from 'nest-crawler';
import { CrawlerService } from './craw-data.service';
@Module({
    imports: [NestCrawlerModule],
    controllers: [CrawlerController],
    providers: [CrawlerService],
    exports: [CrawlerService],
})
export class CrawlerModule {}
