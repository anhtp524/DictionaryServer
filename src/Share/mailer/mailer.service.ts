import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { validate } from 'deep-email-validator';

@Injectable()
export class MailerService {
    private nodemailerTransport: Mail;

    constructor(private readonly configService: ConfigService) {
        this.nodemailerTransport = createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
            from: process.env.EMAIL_USER,
        });
    }

    async sendMail(email: string) {
        try {
            const validateEmail = await validate(email);
            console.log(validateEmail);
            if (validateEmail.valid === false) {
                throw new HttpException(`Can not send message to ${email}`, 400);
            }
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            await this.nodemailerTransport.sendMail({
                from: '"MinhHieu " <mhieu3101@gmail.com>',
                to: email,
                subject: 'Verify Your Account',
                html: `<p>Enter <b>${otp}</b> to verify your email address</p>`,
            });
            return otp;
        } catch (err) {
            throw err;
        }
    }
}
