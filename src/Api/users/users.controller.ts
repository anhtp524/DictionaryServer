import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/Share/enum/enum';
import { Roles } from 'src/Share/guard/roles.decorator';
import { RolesGuard } from 'src/Share/guard/roles.guard';
import { VerifyDto } from './dto/users.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Patch('/verify')
    @Roles(Role.user)
    @UseGuards(RolesGuard)
    async verifyUser(@Body() info:VerifyDto) {
        try{
            return this.userService.verifyUser(info.otp , info.email)
        }catch(err){
            throw err
        }
    }
}
