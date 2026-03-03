import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateSaleItemDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  saleQuantity?: number;
}
