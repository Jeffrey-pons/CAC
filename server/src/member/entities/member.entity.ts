import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum MemberType {
    AMIS = 'Ami',
    ADHERENTS = 'Adhérent',
    CERCLE = 'Cercle',
  }

@Schema()
export class Member  extends Document {
    
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  adresse: string;

  @Prop()
  postaladresse: string;

  @Prop()
  city: string;

  @Prop()
  country: string;

  @Prop()
  email: string;

  @Prop({ type: String, enum: MemberType, required: true })
  type: MemberType;
}
export const MemberSchema = SchemaFactory.createForClass(Member);
