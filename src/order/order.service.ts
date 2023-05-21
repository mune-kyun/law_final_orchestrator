import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CreateReqDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishRabbit() {
    const data = { username: 'order' };
    await this.amqpConnection.publish('orchestrator.order', 'test.order', {
      data: data,
    });
  }

  async postRabbit(jwt: any, body: CreateReqDto) {
    await this.amqpConnection.publish('orchestrator.order', 'test.order', {
      user: body.name,
      jwt,
    });
  }
}
