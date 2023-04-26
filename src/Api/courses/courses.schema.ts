import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from 'src/Share/enum/enum';

export type CoursesDocument = Courses & Document;

@Schema()
export class Courses {
    @Prop()
    courseName: string;

    @Prop()
    description: string;

    @Prop()
    tuitionFee: number;

    @Prop()
    startedTime: Date;

    @Prop()
    endedTime: Date;

    @Prop({
        type: String,
        enum: Status,
        default: Status.active,
    })
    status: Status;
}

export const CourseSchema = SchemaFactory.createForClass(Courses);
