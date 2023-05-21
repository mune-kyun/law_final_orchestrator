import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  // @RabbitSubscribe({
  //   exchange: 'orchestrator.transaction',
  //   routingKey: 'confirm.transaction',
  //   queue: '',
  // })
  async updateTransaction(msg: any) {
    // TODO: publish to transaction
    // TODO: if accept change status order, else delete order
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}
