import { HttpException, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { comparePassword, hashPassword } from 'src/Share/encrypt/encrypt';
import { Status } from 'src/Share/enum/enum';
import { ERROR } from 'src/Share/errorHandling/error.handling';
import { MailerService } from 'src/Share/mailer/mailer.service';
import { UserRepository } from './users.repository';
import { User } from './users.schema';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository, private readonly mailerService: MailerService) {}

    async createUser(user: any): Promise<User> {
        try {
            const userCheck = await this.userRepository.checkUserExist(user.username, user.email);
            if (!userCheck || userCheck.status === Status.deleted) {
                user.password = await hashPassword(user.password);
                user.activeCode = await this.mailerService.sendMail(user.email);
                return this.userRepository.create(user);
            }
            throw new HttpException(
                ERROR.USERNAME_OR_EMAIL_EXISTED.message,
                ERROR.USERNAME_OR_EMAIL_EXISTED.statusCode,
            );
        } catch (err) {
            throw err;
        }
    }

    async verifyUser(otp: string, email: string) {
        const user = await this.userRepository.getOneByCondition({ email: email });
        if (!user || user.status === Status.deleted) {
            throw new HttpException(ERROR.USER_NOT_FOUND.message, ERROR.USER_NOT_FOUND.statusCode);
        }
        if (user.status === Status.active) {
            throw new HttpException(ERROR.USER_IS_VERIFIED.message, ERROR.USER_IS_VERIFIED.statusCode);
        }
        if (otp !== user.activeCode) {
            throw new HttpException(ERROR.ACTIVECODE_IS_WRONG.message, ERROR.ACTIVECODE_IS_WRONG.statusCode);
        }
        user.status = Status.active;
        await user.save();
        throw new HttpException(`Verify ${user.email} success`, 200);
    }

    async getUser(id: string) {
        const user = await this.userRepository.getOneByCondition({ _id: new mongoose.Types.ObjectId(id) });
        if (!user || user.status === Status.deleted) {
            throw new HttpException(ERROR.USER_NOT_FOUND.message, ERROR.USER_NOT_FOUND.statusCode);
        }
        delete user.activeCode;
        delete user.password;
        return user;
    }

    async getAllUser(limit?: number, page?: number, search?: object) {
        return this.userRepository.getAll(limit, page, search);
    }

    async sendOTP(email: string) {
        const user = await this.userRepository.getOneByCondition({ email: email });
        if (!user || user.status === Status.deleted) {
            throw new HttpException(ERROR.USER_NOT_FOUND.message, ERROR.USER_NOT_FOUND.statusCode);
        }
        user.activeCode = await this.mailerService.sendMail(email);
        await user.save();
        throw new HttpException(`Send OTP to ${email}`, 200);
    }

    async forgotPassword(email: string, otp: string, newPassword: string) {
        const user = await this.userRepository.getOneByCondition({ email: email });
        if (!user || user.status === Status.deleted) {
            throw new HttpException(ERROR.USER_NOT_FOUND.message, ERROR.USER_NOT_FOUND.statusCode);
        }
        if (user.activeCode !== otp) {
            throw new HttpException('OTP is wrong', 400);
        }
        user.password = await hashPassword(newPassword);
        await user.save();
        throw new HttpException(`Your user's password is changed successful`, 200);
    }

    async changePassword(id: string, password: string, newPassword: string) {
        const user = await this.userRepository.getOneByCondition({ id: new mongoose.Types.ObjectId(id) });
        if (!user || user.status === Status.deleted) {
            throw new HttpException(ERROR.USER_NOT_FOUND.message, ERROR.USER_NOT_FOUND.statusCode);
        }
        if (!(await comparePassword(password, user.password))) {
            throw new HttpException('Your password is wrong', 400);
        }
        user.password = await hashPassword(newPassword);
        await user.save();
        throw new HttpException(`Your user's password is changed successful`, 200);
    }

    async updateUser(id: string, updateAccount: any) {
        return await this.userRepository.updateById(id, updateAccount);
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.getOneByCondition({ id: new mongoose.Types.ObjectId(id) });
        if (!user || user.status === Status.deleted) {
            throw new HttpException(ERROR.USER_NOT_FOUND.message, ERROR.USER_NOT_FOUND.statusCode);
        }
        user.status = Status.deleted;
        await user.save();
        throw new HttpException(`Delete user ${user.username} successful`, 200);
    }
}
