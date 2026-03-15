import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddSaleItemDto {
  @IsMongoId()
  @IsNotEmpty()
  productId: string;

  @IsMongoId()
  @IsNotEmpty()
  saleId: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  salePrice: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  saleQuantity: number;
}
