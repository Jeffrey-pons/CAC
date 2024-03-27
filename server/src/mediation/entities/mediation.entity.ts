import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Mediation extends Document {
    @Prop()
    title: string;
    
    @Prop()
    image: string;
    
    @Prop()
    intro: string;
    
    @Prop()
    subtitle: string;
    
    @Prop()
    description: string;
    
    @Prop()
    infosupp: string;
}

export const MediationSchema = SchemaFactory.createForClass(Mediation);