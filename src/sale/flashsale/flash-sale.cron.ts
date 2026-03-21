// flash-sale.cron.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FlashSaleService } from './flash-sale.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from '../schema/sale.schema';

@Injectable()
export class FlashSaleCron {
  private readonly logger = new Logger(FlashSaleCron.name);

  constructor(
    private readonly flashSaleService: FlashSaleService,
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
  ) {}

  // runs every minute
  @Cron(CronExpression.EVERY_MINUTE)
  async handleFlashSales() {
    const now = new Date();
    try {
      // Find active and enabled sales
      const activeSales = await this.saleModel.find({
        startTime: { $lte: now },
        endTime: { $gt: now },
        isEnabled: true,
      });

      for (const sale of activeSales) {
        // Optional: check if already added to Redis to avoid duplication
        await this.flashSaleService.addProductsToRedis(sale._id);
        this.logger.log(`Flash sale added to Redis: ${sale.title}`);
      }
    } catch (err) {
      this.logger.error('Error processing flash sales:', err);
    }
  }
}
