import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News extends Document {
  @Prop()
  title: string;

  @Prop()
  image: string[];

  @Prop()
  month: string;

  @Prop()
  description: string;

  @Prop()
  type: string;

  @Prop()
  rencontretext: string;

  @Prop()
  event: string;

  @Prop()
  soutien: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
