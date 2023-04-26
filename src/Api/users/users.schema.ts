import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role, Status } from 'src/Share/enum/enum';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    email: string;

    @Prop()
    fullname: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    address: string;

    @Prop()
    dob: Date;

    @Prop({ default: '', length: 4 })
    activeCode: string;

    @Prop({
        type: String,
        enum: Role,
        default: Role.user,
    })
    role: Role;

    @Prop({
        type: String,
        enum: Status,
        default: Status.inactive,
    })
    status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);
