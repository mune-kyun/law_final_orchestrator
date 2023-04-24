import { Injectable } from '@nestjs/common';
import { JwtDTO, LoginDto } from './dto';

@Injectable()
export class AuthService {
  login(jwt: JwtDTO, dto: LoginDto): string {
    return `${dto.username} ${dto.password} ${jwt}`;
  }
}
