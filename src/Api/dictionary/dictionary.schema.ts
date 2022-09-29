import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DictionaryDocument = Dictionary & Document;

@Schema()
export class Dictionary {
    @Prop({ type: String, length: 255, required: true })
    originalWord: string;

    @Prop({ type: String, length: 255 })
    translatedWord: string;

    @Prop({ type: String, length: 1000 })
    descriptiob: string;
}

export const DictionarySchema = SchemaFactory.createForClass(Dictionary);
