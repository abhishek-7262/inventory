import { IsDateString, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsString()
  title: string;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;
}
