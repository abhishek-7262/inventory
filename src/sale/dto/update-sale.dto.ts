import { IsDateString, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSaleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsDateString()
  endTime?: Date;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
