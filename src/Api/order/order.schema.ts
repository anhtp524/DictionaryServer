import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Status } from 'src/Share/enum/enum';
import { User } from '../users/users.schema';
import { Courses } from '../courses/courses.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop()
    totalPayment: number;

    @Prop({
        type: String,
        enum: Status,
        default: Status.not_payment,
    })
    status: Status;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Courses.name }] })
    courseId: Types.ObjectId[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    userId: Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
