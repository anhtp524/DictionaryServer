import { HttpException, Injectable } from '@nestjs/common';
import { hashPassword } from 'src/Share/encrypt/encrypt';
import { Status } from 'src/Share/enum/enum';
import { ERROR } from 'src/Share/errorHandling/error.handling';
import { MailerService } from 'src/Share/mailer/mailer.service';
import { UserRepository } from './users.repository';
import { User } from './users.schema';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository, private readonly mailerService:MailerService) {}

    async createUser(user: any): Promise<User>{
        const userCheck = await this.userRepository.checkUserExist(user.username, user.email);   
        if (!userCheck || userCheck.status === Status.deleted) {
            user.password = await hashPassword(user.password);
            user.activeCode = await this.mailerService.sendMail(user.email);
            
            return this.userRepository.create(user);
        }
        throw new HttpException(ERROR.USERNAME_OR_EMAIL_EXISTED.message, ERROR.USERNAME_OR_EMAIL_EXISTED.statusCode);
    }

    async verifyUser(otp: string , email: string) {
        const user = await this.userRepository.getOneByCondition({'email': email});
        if(!user || user.status === Status.deleted){
            throw new HttpException(ERROR.USER_NOT_FOUND.message, ERROR.USER_NOT_FOUND.statusCode)
        }
        if(user.status === Status.active){
            throw new HttpException(ERROR.USER_IS_VERIFIED.message, ERROR.USER_IS_VERIFIED.statusCode)
        }
        if(otp !== user.activeCode){
            throw new HttpException(ERROR.ACTIVECODE_IS_WRONG.message, ERROR.ACTIVECODE_IS_WRONG.statusCode)
        }
        user.status = Status.active
        await user.save();
        return user;
    }
}
