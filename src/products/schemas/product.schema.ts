import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductsDocument = Products & Document;

@Schema()
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  quantity: number;

  @Prop({ required: true })
  category: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
