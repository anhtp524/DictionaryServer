import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

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
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            console.log(otp);  
            console.log(process.env.EMAIL_USER);
               
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