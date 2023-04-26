import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length, IsString, MinLength, IsDateString } from 'class-validator';

export class VerifyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(4)
    otp: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class SendOTPDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class forgotPasswordDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(4)
    otp: string;
}

export class changePasswordDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    newPassword: string;
}

export class updateAccountDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(10)
    phoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsDateString({}, { each: true })
    @IsNotEmpty()
    dob: Date;
}
