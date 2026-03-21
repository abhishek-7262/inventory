import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedisService } from 'src/common/redis/redis.service';

import { Sale, SaleDocument } from '../schema/sale.schema';
import { SaleItem, SaleItemDocument } from '../schema/sale-item.schema';

@Injectable()
export class FlashSaleService {
  private readonly logger = new Logger(FlashSaleService.name);

  constructor(
    @InjectModel(Sale.name)
    private readonly saleModel: Model<SaleDocument>,

    @InjectModel(SaleItem.name)
    private readonly saleItemModel: Model<SaleItemDocument>,

    private readonly redisService: RedisService,
  ) {}

  /**
   * Add sale items to Redis
   */
  async addProductsToRedis(saleId: string): Promise<void> {
    // 1. Fetch Sale
    const sale = await this.saleModel.findById(saleId);
    if (!sale) {
      this.logger.warn(`Sale ${saleId} not found`);
      return;
    }

    // 2. Validate Sale
    if (!sale.isEnabled) {
      this.logger.warn(`Sale ${saleId} is disabled`);
      return;
    }

    const status = (sale as any).status;
    if (status !== 'active') {
      this.logger.warn(`Sale ${saleId} is not active (status: ${status})`);
      return;
    }

    // 3. TTL Calculation
    const ttl = Math.max(
      0,
      Math.floor((sale.endTime.getTime() - Date.now()) / 1000),
    );

    if (ttl <= 0) {
      this.logger.warn(`Sale ${saleId} already expired`);
      return;
    }

    // 4. Fetch Sale Items
    const items = await this.saleItemModel
      .find({ flashSale: saleId })
      .select('product salePrice saleQuantity soldQuantity');

    if (!items.length) {
      this.logger.warn(`No sale items found for sale ${saleId}`);
      return;
    }

    // 5. Store in Redis
    for (const item of items) {
      const redisKey = `flashsale:${saleId}:product:${item._id}`;

      await this.redisService.setHash(
        redisKey,
        {
          productId: item.product.toString(),
          salePrice: item.salePrice.toString(),
          saleQuantity: item.saleQuantity.toString(),
          soldQuantity: item.soldQuantity.toString(),
        },
        ttl,
      );
    }

    this.logger.log(`Added ${items.length} items to Redis for sale ${saleId}`);
  }

  /**
   * Remove sale items from Redis
   */
  async removeProductsFromRedis(saleId: string): Promise<void> {
    const items = await this.saleItemModel.find({
      flashSale: saleId,
    });

    for (const item of items) {
      const redisKey = `flashsale:${saleId}:product:${item._id}`;
      await this.redisService.del(redisKey);
    }

    this.logger.log(
      `Removed ${items.length} items from Redis for sale ${saleId}`,
    );
  }
}
