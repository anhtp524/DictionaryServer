import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SequenceController } from './sequence.controller';
import { SequenceRepository } from './sequence.repository';
import { Sequence, sequenceSchema } from './sequence.schema';
import { SequenceService } from './sequence.service';



@Module({
    imports: [
        MongooseModule.forFeature([{name: Sequence.name, schema: sequenceSchema}]),
    ],
    controllers: [SequenceController],
    providers: [SequenceService, SequenceRepository],
})
export class SequenceModule {}
