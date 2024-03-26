import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class NextExposition extends Document {
  @Prop()
  titleDate: string;

  @Prop()
  image: string;

  @Prop()
  name: string;

  @Prop()
  dateOfExpo: string;

  @Prop()
  description: string;

  @Prop()
  type: string;
}

export const NextExpositionSchema = SchemaFactory.createForClass(NextExposition);
