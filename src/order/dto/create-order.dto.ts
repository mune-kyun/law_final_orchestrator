import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  start_date: string;

  @IsString()
  @IsNotEmpty()
  finish_date: string;

  @IsString()
  @IsNotEmpty()
  orderer: string;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
