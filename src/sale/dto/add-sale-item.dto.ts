import { IsMongoId, IsNumber, Min } from 'class-validator';

export class AddSaleItemDto {
  @IsMongoId()
  productId: string;

  @IsNumber()
  @Min(0)
  salePrice: number;

  @IsNumber()
  @Min(1)
  saleQuantity: number;
}
