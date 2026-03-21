export class UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
  quantity?: number;
  category: string;
  isActive?: boolean;
}
