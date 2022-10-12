import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TayDocument = Tay & Document;

@Schema()
export class Tay {
    @Prop()
    word: string
}

export const TaySchema = SchemaFactory.createForClass(Tay);
