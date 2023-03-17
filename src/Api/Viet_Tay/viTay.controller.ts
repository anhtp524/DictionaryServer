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

    @Get('viet/ESsearch')
    async translateVietToTayByElasticSearch(@Query() query) {
        try {
            return await this.viTayService.translateByElasticSearch(query.word, 'viet');
            
        } catch (err) {    
            throw err;
        }
    }

    @Get('tay/ESsearch')
    async translateTayToVietByElasticSearch(@Query() query) {
        try {
            return await this.viTayService.translateByElasticSearch(query.word, 'tay');
            
        } catch (err) {    
            throw err;
        }
    }

    @Get('viet/wordSuggestion')
    async vietSuggestionWord(@Query() query) {
        try {
            return await this.viTayService.wordSuggeston(query.word, 'viet');
            
        } catch (err) {   
            throw err;
        }
    }

    @Get('tay/wordSuggestion')
    async taySuggestionWord(@Query() query) {
        try {
            return await this.viTayService.wordSuggeston(query.word, 'tay');
            
        } catch (err) {   
            throw err;
        }
    }

    @Get('viet')
    async translateVietToTay(@Query() query) {
        try {
            return await this.viTayService.translate(query.word, 'viet');         
        } catch (err) {     
            throw err;
        }
    }

    @Get('tay')
    async translateTayToViet(@Query() query) {
        try {
            return await this.viTayService.translate(query.word, 'tay');         
        } catch (err) {     
            throw err;
        }
    }
}
