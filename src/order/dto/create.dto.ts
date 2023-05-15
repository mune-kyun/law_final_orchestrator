import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
