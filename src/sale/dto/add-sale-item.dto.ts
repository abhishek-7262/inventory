import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddSaleItemDto {
  @IsMongoId()
  @IsNotEmpty()
  flashSale: string; // corresponds to schema.flashSale

  @IsMongoId()
  @IsNotEmpty()
  product: string; // corresponds to schema.product

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  salePrice: number;

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  saleQuantity: number;
}
