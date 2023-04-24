import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class JwtDTO {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  jwt: string;
}
