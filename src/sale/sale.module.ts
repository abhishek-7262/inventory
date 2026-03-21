import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './schema/sale.schema';
import { SaleItem, SaleItemSchema } from './schema/sale-item.schema';

import { FlashSaleService } from './flashsale/flash-sale.service';
import { FlashSaleCron } from './flashsale/flash-sale.cron';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Sale.name, schema: SaleSchema },
      { name: SaleItem.name, schema: SaleItemSchema },
    ]),
  ],
  controllers: [SaleController],
  providers: [SaleService, FlashSaleService, FlashSaleCron],
  exports: [FlashSaleService],
})
export class SaleModule {}
