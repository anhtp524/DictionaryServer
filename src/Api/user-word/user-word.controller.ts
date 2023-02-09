import { Controller, Post, UseGuards, Request, Param } from '@nestjs/common';
import { Role } from 'src/Share/enum/enum';
import { Roles } from 'src/Share/guard/roles.decorator';
import { RolesGuard } from 'src/Share/guard/roles.guard';
import { UserWordService } from './user-word.service';

@Controller('user-word')
export class UserWordController {
    constructor(private readonly userWordService: UserWordService) { }
    
    @Post('/:wordId')
    @Roles(Role.user)
    @UseGuards(RolesGuard) 
    async addWord(@Request() req, @Param('wordId') wordId: string) {
        try {
            return await this.userWordService.addWord(req.userId , wordId)
        } catch (err) {
            throw err;
        }
    }
}
