import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlerModule } from '../craw-data/craw-data.module';
import { SequenceController } from './sequence.controller';
import { SequenceRepository } from './sequence.repository';
import { Sequence, sequenceSchema } from './sequence.schema';
import { SequenceService } from './sequence.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Sequence.name, schema: sequenceSchema }]), CrawlerModule],
    controllers: [SequenceController],
    providers: [SequenceService, SequenceRepository],
})
export class SequenceModule {}
