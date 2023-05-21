import { Injectable } from '@nestjs/common';
import { JwtDTO, LoginDto } from './dto';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class AuthService {
  login(jwt: JwtDTO, dto: LoginDto): string {
    return `${dto.username} ${dto.password} ${jwt}`;
  }
}
