import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VietDocument = Viet & Document;

@Schema()
export class Viet {
    @Prop()
    word: string
}

export const VietSchema = SchemaFactory.createForClass(Viet);
