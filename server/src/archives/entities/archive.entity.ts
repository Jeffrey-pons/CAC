import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema()
export class Archive extends Document {     
    @Prop()
    date: number;
 
    @Prop()
    artist: string;
}
export const ArchiveSchema = SchemaFactory.createForClass(Archive);