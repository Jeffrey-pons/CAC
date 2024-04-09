import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Archive extends Document {
  @Prop()
  date: number;

  @Prop()
  artist: string;

  @Prop({ required: false })
  title?: string;

  @Prop()
  month: string;

  @Prop()
  image: string[];

  @Prop()
  description: string;

  @Prop()
  rencontretext: string;

  @Prop()
  type: string;
}
export const ArchiveSchema = SchemaFactory.createForClass(Archive);
