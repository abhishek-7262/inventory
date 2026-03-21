import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly redis: RedisService,
    @InjectModel(Products.name)
    private readonly productsModel: Model<ProductsDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    await this.redis.set('mykey', 'hello from nestjs');

    return this.productsModel.create(createProductDto);
  }

  async findAll() {
    return this.productsModel.find();
  }

  async findOne(id: string) {
    const product = await this.productsModel.findById(id);

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productsModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  async remove(id: string) {
    const product = await this.productsModel.findByIdAndDelete(id);
    if (!product) throw new NotFoundException('product not found');

    return { message: 'product deleted successfully' };
  }
}
