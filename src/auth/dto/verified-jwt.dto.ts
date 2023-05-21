import { IsNotEmpty, IsString } from 'class-validator';

export class VerifiedJwtDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

// {
//   "token_type": "access",
//   "user_id": 1,
//   "username": "test",
//   "email": "test@gmail.com",
//   "first_name": "test",
//   "last_name": "test"
// }
