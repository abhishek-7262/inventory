import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SaleItemDocument = HydratedDocument<SaleItem>;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class SaleItem {
  @Prop({
    type: Types.ObjectId,
    ref: 'FlashSale',
    required: true,
    index: true,
  })
  flashSale: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Products',
    required: true,
    index: true,
  })
  product: Types.ObjectId;

  @Prop({
    required: true,
    min: 0,
  })
  salePrice: number;

  @Prop({
    required: true,
    min: 1,
  })
  saleQuantity: number;

  @Prop({
    default: 0,
    min: 0,
  })
  soldQuantity: number;
}

export const SaleItemSchema = SchemaFactory.createForClass(SaleItem);
