import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Sale {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ required: true })
  startTime: Date;

  @Prop({ required: true })
  endTime: Date;

  @Prop({ default: true })
  isEnabled: boolean;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

// Indexes
SaleSchema.index({ startTime: 1, endTime: 1 });
SaleSchema.index({ title: 1 }, { unique: true });

// Virtual status field
SaleSchema.virtual('status').get(function (this: Sale) {
  const now = new Date();

  if (!this.isEnabled) return 'disabled';
  if (now < this.startTime) return 'upcoming';
  if (now > this.endTime) return 'ended';
  return 'active';
});

// Return virtuals
SaleSchema.set('toJSON', { virtuals: true });
SaleSchema.set('toObject', { virtuals: true });

// Date validation
SaleSchema.pre('save', async function (this: HydratedDocument<Sale>) {
  if (this.startTime >= this.endTime) {
    throw new Error('startTime must be before endTime');
  }
});
