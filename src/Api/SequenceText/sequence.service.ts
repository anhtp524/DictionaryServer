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

    async getVietNamSequence() {
        return await this.sequenceRepo.getAllByCondition({})
    }

    async updateTaySequence(id: string, stringTay: any) {
        return await this.sequenceRepo.updateById(id, stringTay )
    }
}
