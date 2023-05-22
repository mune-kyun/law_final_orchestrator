import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DeleteTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
