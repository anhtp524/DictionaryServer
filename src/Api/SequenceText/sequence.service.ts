import { Injectable } from '@nestjs/common';
import { SequenceRepository } from './sequence.repository';



@Injectable()
export class SequenceService {
    constructor(private readonly sequenceRepo: SequenceRepository) {}

    async getVietNamSequence() {
        return await this.sequenceRepo.getAllByCondition({})
    }

    async updateTaySequence(id: string, stringTay: any) {
        return await this.sequenceRepo.updateById(id, stringTay )
    }
}
