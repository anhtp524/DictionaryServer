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
    getTaySequece() {
        return this.sequenceService.getTaySequence()
    }

    @Patch('/:id')
    updateVietSequence(@Param('id') id: string, @Body() {stringViet}: {stringViet: string}) {
        return this.sequenceService.updateVietSequence(id, stringViet)
    }

}
