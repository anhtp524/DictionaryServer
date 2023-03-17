import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, Request, Delete } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PaginationDto } from 'src/Share/dtos/pagination.dto';
import { Role } from 'src/Share/enum/enum';
import { Roles } from 'src/Share/guard/roles.decorator';
import { RolesGuard } from 'src/Share/guard/roles.guard';
import { changePasswordDTO, forgotPasswordDTO, SendOTPDto, updateAccountDto, VerifyDto } from './dto/users.dto';
import { User, UserDocument } from './users.schema';
import { UsersService } from './users.service';

@Controller('')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Patch('user/verify')
    async verifyUser(@Body() info:VerifyDto) {
        try{
            return this.userService.verifyUser(info.otp , info.email)
        }catch(err){
            throw err
        }
    }

    @ApiQuery({name : "limit", required: false, type: 'integer'})
    @ApiQuery({name : "page", required: false, type: 'integer'})
    @ApiQuery({ name: "search", required: false, type: 'string' })
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    @Get('admin')
    async getAllAccout(@Query() { limit, page, search }: PaginationDto) {
        try {
            return await this.userService.getAllUser(limit, page, search)          
        } catch (err) {
            throw err;
        }
    }

    @Get('/user/infor')
    @Roles(Role.admin, Role.user)
    @UseGuards(RolesGuard)    
    async getInfor(@Request() req) {
        try {
            return await this.userService.getUser(req.userId)       
        } catch (err) {
            throw err;
        }
    }

    @Get('/admin/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    async getAccountById(@Param('id') id: string): Promise<UserDocument> {
        try {
            return await this.userService.getUser(id)     
        } catch (err) {
            throw err;
        }
    }

    @Patch('/user/sendOTP')
    @Roles(Role.user, Role.admin)
    @UseGuards(RolesGuard)
    async sendOTP(@Body() info:SendOTPDto) {
        try{
            return this.userService.sendOTP(info.email)
        }catch(err){
            throw err
        }
    }

    @Patch('/user/forgot-password')
    async forgotPassword(@Body() info: forgotPasswordDTO) {
        try{
            return await this.userService.forgotPassword(info.email, info.otp, info.password);
        }catch(err){
            throw err
        }
    }

    @Patch('/user/change-password')
    @Roles()
    @UseGuards(RolesGuard)
    async changePassword(@Body() info: changePasswordDTO, @Request() req) {
        try {
            return await this.userService.changePassword(req.userId, info.password, info.newPassword);      
        } catch (err) {
            throw err;
        }
    }

    @Patch('/user/update')
    @Roles()
    @UseGuards(RolesGuard)
    async updateUser(@Body() info: updateAccountDto, @Request() req) {
        try {
            return await this.userService.updateUser(req.userId, info);         
        } catch (err) {
            console.log(err);         
            throw err;
        }
    }

    @Delete('/admin/:id')
    @Roles(Role.admin)
    @UseGuards(RolesGuard)
    // @ApiParam({
    //     name: 'userId',
    //     format: 'uuid',
    //     type: 'string',
    // })
    async deleteUser(@Param('id') id: string) {
        try {
            return await this.userService.deleteUser(id);        
        } catch (err) {
            throw err;
        }
    }
}
