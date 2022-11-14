import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { SequenceService } from './sequence.service';

@Controller('sequence')
export class SequenceController {
    constructor(private readonly sequenceService: SequenceService) {}

    @Get('add')
    addData() {
        this.sequenceService.create()
        return "test"
    }

    @Get('')
    getVietNamSequece() {
        return this.sequenceService.getVietNamSequence()
    }

    @Patch('/:id')
    updateTaySequence(@Param('id') id: string, @Body() stringTay: {stringTay: string}) {
        return this.sequenceService.updateTaySequence(id, stringTay)
    }

}
