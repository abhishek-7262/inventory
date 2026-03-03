import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sale, SaleDocument } from './schema/sale.schema';
import { Model } from 'mongoose';
import { SaleItem, SaleItemDocument } from './schema/sale-item.schema';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AddSaleItemDto } from './dto/add-sale-item.dto';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale.name)
    private saleModel: Model<SaleDocument>,

    @InjectModel(SaleItem.name)
    private saleItemModel: Model<SaleItemDocument>,
  ) {}

  async createSale(dto: CreateSaleDto) {
    return this.saleModel.create(dto);
  }

  async updateSale(id: string, dto: UpdateSaleDto) {
    const sale = await this.saleModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!sale) throw new NotFoundException('Sale not found');
    return sale;
  }

  async getSale(id: string) {
    const sale = await this.saleModel.findById(id);

    if (!sale) throw new NotFoundException('sale not found');

    const items = await this.saleItemModel
      .find({ flashSale: id })
      .populate('product');

    return { sale, items };
  }

  async addItemToSale(saleId: string, dto: AddSaleItemDto) {
    const saleExists = await this.saleModel.findById(saleId);
    if (!saleExists) throw new NotFoundException('Sale not found');

    return this.saleItemModel.create({
      flashSale: saleId,
      product: dto.productId,
      salePrice: dto.salePrice,
      saleQuantity: dto.saleQuantity,
    });
  }

  // ✅ Update Sale Item
  async updateSaleItem(itemId: string, dto: UpdateSaleItemDto) {
    const item = await this.saleItemModel.findByIdAndUpdate(itemId, dto, {
      new: true,
    });

    if (!item) throw new NotFoundException('Sale item not found');

    return item;
  }

  // ✅ Remove Item from Sale
  async removeSaleItem(itemId: string) {
    const item = await this.saleItemModel.findByIdAndDelete(itemId);

    if (!item) throw new NotFoundException('Sale item not found');

    return { message: 'Sale item removed' };
  }
}
