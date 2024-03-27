import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Archive extends Document {
  @Prop()
  date: number;

  @Prop()
  artist: string;

  @Prop()
  title: string;

  @Prop()
  month: string;

  @Prop()
  image: string[];

  @Prop()
  description: string;

  @Prop()
  rencontretext: string;
}
export const ArchiveSchema = SchemaFactory.createForClass(Archive);
