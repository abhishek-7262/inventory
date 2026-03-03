import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './schema/sale.schema';
import { SaleItem, SaleItemSchema } from './schema/sale-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sale.name, schema: SaleSchema },
      { name: SaleItem.name, schema: SaleItemSchema },
    ]),
  ],
  controllers: [SaleController],
  providers: [SaleService],
})
export class SaleModule {}
