import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AddSaleItemDto } from './dto/add-sale-item.dto';
import { UpdateSaleItemDto } from './dto/update-sale-item.dto';

@Controller('admin/sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  createSale(@Body() dto: CreateSaleDto) {
    return this.saleService.createSale(dto);
  }

  @Put(':id')
  updateSale(@Param('id') id: string, @Body() dto: UpdateSaleDto) {
    return this.saleService.updateSale(id, dto);
  }

  @Get(':id')
  getSale(@Param('id') id: string) {
    return this.saleService.getSale(id);
  }

  @Post(':id/items')
  addItem(@Param('id') saleId: string, @Body() dto: AddSaleItemDto) {
    return this.saleService.addItemToSale(saleId, dto);
  }

  @Put('items/:itemId')
  updateItem(@Param('itemId') itemId: string, @Body() dto: UpdateSaleItemDto) {
    return this.saleService.updateSaleItem(itemId, dto);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId') itemId: string) {
    return this.saleService.removeSaleItem(itemId);
  }
}
