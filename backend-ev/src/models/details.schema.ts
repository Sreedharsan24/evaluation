/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectIdDocument } from './common.schema';

@Schema()
export class details extends ObjectIdDocument{
  @Prop()
  userID: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  Address: string;

  @Prop()
  profile: string;

  @Prop()
  status: string;
}

export const CreateSchema = SchemaFactory.createForClass(details);
