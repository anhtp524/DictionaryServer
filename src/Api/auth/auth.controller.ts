import { Body, Controller, Post } from '@nestjs/common';
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
}
