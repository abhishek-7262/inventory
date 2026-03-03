import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products, ProductsDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private productsModel: Model<ProductsDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
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
