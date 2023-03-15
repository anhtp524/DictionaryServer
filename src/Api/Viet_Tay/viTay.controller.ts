import { Controller, Get, Post, Query } from '@nestjs/common';
import { ElasticSearchService } from 'src/Share/elasticsearch/elasticsearch.service';
import { viTayService } from './viTay.service';

@Controller('dictionary')
export class VietTayController {
    constructor(private readonly viTayService: viTayService, private readonly esService: ElasticSearchService) {}

    @Get('add')
    async create() {
        await this.viTayService.create();
        return "test"
    }

    @Get('addDataES')
    async addDataElasticSearch() {
        try {
            return await this.viTayService.indexESData();
            
        } catch (err) {
            console.log(err);          
            throw err;
        }
    }

    @Get('ESsearch/viet')
    async translateVietToTayByElasticSearch(@Query() query) {
        try {
            return await this.viTayService.getVietToTayByElasticSearch(query.word);
            
        } catch (err) {
            console.log(err);
            
            throw err;
        }
        // if (translateWord.length !== 0) {
        //     return translateWord;
        // }

        // return this.viTayService.translateSequenceTextVietnamToTay(query);
    }

    @Get('viet')
    async translateVietToTay(@Query() query) {
        try {
            return await this.viTayService.getVietToTay(query.word);
            
        } catch (err) {
            console.log(err);
            
            throw err;
        }
        // if (translateWord.length !== 0) {
        //     return translateWord;
        // }

        // return this.viTayService.translateSequenceTextVietnamToTay(query);
    }

    @Get('tay')
    async translateTayToViet(@Query() query) {
        const translateWord = await this.viTayService.getTayToViet(query.word);
        if (translateWord.length !== 0) {
            return translateWord;
        }

        return this.viTayService.translateSequenceTextTayToVietnam(query.word);
    }
}
