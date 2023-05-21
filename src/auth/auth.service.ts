import { Injectable, HttpException } from '@nestjs/common';
import { JwtDTO, LoginDto, VerifiedJwtDto } from './dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  login(jwt: JwtDTO, dto: LoginDto): string {
    return `${dto.username} ${dto.password} ${jwt}`;
  }
}
