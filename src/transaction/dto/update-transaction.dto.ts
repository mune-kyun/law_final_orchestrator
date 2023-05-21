import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
