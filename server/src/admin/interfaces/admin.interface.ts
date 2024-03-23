import { Document } from 'mongoose';

export interface IAdmin extends Document {
  readonly name: string;
  readonly role: string;
  readonly email: string;
  readonly password: string;
}
