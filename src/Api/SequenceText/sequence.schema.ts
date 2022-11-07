import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type sequenceDocument = Sequence & Document;

@Schema()
export class Sequence {
    @Prop()
    stringVietNam: string;

    @Prop()
    stringTay: string;
}

export const sequenceSchema = SchemaFactory.createForClass(Sequence);
