import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Tay } from '../Tay/tay.schema';
import { Viet } from '../Viet/viet.schema';

export type viTayDocument = Viet_Tay & Document;

@Schema()
export class Viet_Tay {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Viet.name })
    idVi: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Tay.name })
    idTay: Types.ObjectId;
}

export const viTaySchema = SchemaFactory.createForClass(Viet_Tay);
