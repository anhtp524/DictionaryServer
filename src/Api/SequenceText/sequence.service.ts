import { Injectable } from '@nestjs/common';
import { CrawlerService } from '../craw-data/craw-data.service';
import { SequenceRepository } from './sequence.repository';
import { sequenceDocument } from './sequence.schema';



@Injectable()
export class SequenceService {
    constructor(private readonly sequenceRepo: SequenceRepository, private crawlService: CrawlerService) {}

    async create() {
        const arr_data = await this.crawlService.scrape()
        await arr_data.map((value,index) => {
            const item = {
                stringVietNam: "",
                stringTay: value
            }

            this.sequenceRepo.create(<sequenceDocument>item)
        })
        
    }

    async getTaySequence() {
        return await this.sequenceRepo.getAllByCondition({})
    }

    async updateVietSequence(id: string, stringViet: any) {
        await this.sequenceRepo.updateById(id, { stringVietNam: stringViet} ) 
        return await this.sequenceRepo.updateById(id, {stringVietNam: stringViet} )
    }
}
