import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema()
export class Admin extends Document {
   @Prop()
   name: string;

   @Prop()
   roleNumber: number;
   
   @Prop()
   email: string;
}
export const AdminSchema = SchemaFactory.createForClass(Admin);