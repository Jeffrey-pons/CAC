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

  @Prop({ type: [String] })
  rencontretext: string[];

  @Prop({ type: [String] })
  event: string[];

  @Prop({ type: [String] })
  soutien: string[];
}

export const NewsSchema = SchemaFactory.createForClass(News);
