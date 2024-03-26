import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Artwork extends Document {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  artist: string;

  @Prop()
  description: string;

  @Prop()
  dateOfExposition: string;

  @Prop()
  type: string;
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);
