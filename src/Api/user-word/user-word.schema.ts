import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from '../users/users.schema';
import { Viet_Tay } from '../Viet_Tay/viTay.schema';

export type UserWordDocument = UserWord & Document;

@Schema()
export class UserWord {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
    idUser: Types.ObjectId;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: Viet_Tay.name})
    idWord: Types.ObjectId;
}

export const userWordSchema = SchemaFactory.createForClass(UserWord);
