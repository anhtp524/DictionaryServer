import { Controller, Post, UseGuards, Request, Delete, Get, Query } from '@nestjs/common';
import { Role } from 'src/Share/enum/enum';
import { Roles } from 'src/Share/guard/roles.decorator';
import { RolesGuard } from 'src/Share/guard/roles.guard';
import { UserWordService } from './user-word.service';

@Controller('user-word')
export class UserWordController {
    constructor(private readonly userWordService: UserWordService) {}

    @Post('')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async addWord(@Request() req, @Query() query) {
        try {
            return await this.userWordService.addWord(req.userId, query.viet, query.tay, query.level);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    @Delete('')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async deleteUserWord(@Request() req, @Query() query) {
        try {
            return await this.userWordService.deleteUserWord(req.userId, query.viet, query.tay);
        } catch (err) {
            throw err;
        }
    }

    @Get('')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async getUserWord(@Request() req) {
        try {
            return await this.userWordService.getUserWord(req.userId);
        } catch (err) {
            throw err;
        }
    }
}
