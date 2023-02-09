import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty , IsEmail , Length, IsString } from "class-validator";

export class VerifyDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(4)
    otp: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string
}