import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumberString, IsString, MinLength } from 'class-validator';

export class CreateCourseDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    courseName: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    description: string;

    @ApiProperty()
    @IsNumberString()
    @IsNotEmpty()
    tuitionFee: string;

    @ApiProperty()
    @IsDateString({}, { each: true })
    @IsNotEmpty()
    startedTime: Date;

    @ApiProperty()
    @IsDateString({}, { each: true })
    @IsNotEmpty()
    endedTime: Date;
}
