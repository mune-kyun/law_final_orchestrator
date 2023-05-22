import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  order_id: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
