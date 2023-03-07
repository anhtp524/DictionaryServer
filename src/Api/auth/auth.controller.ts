import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common/decorators';
import { Role } from 'src/Share/enum/enum';
import { Roles } from 'src/Share/guard/roles.decorator';
import { RolesGuard } from 'src/Share/guard/roles.guard';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() user: RegisterDto){
        try{
            return await this.authService.register(user);
        }catch(err){
            return err;
        }
    }

    @Post('login')
    async login(@Body() info: LoginDto){
        try{
            return await this.authService.login(info);
        }catch(err){
            return err;
        }
    }


    @Post('logout')
    @Roles(Role.user)
    @UseGuards(RolesGuard) 
    async logout(@Request() req){
        try{
            return await this.authService.logout(req.userId);
        }catch(err){
            return err;
        }
    }
}
