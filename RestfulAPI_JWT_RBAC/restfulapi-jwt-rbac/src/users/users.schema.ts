import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  constructor(partial: Partial<User>) {
    Object.assign(this as User, partial);
  }

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
