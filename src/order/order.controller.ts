import { Body, Controller, Get, Post, Inject } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Controller('/orchestrator/order')
export class OrderController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('/publish-rabbit')
  async publishRabbit() {
    const data = { username: 'order' };
    await this.amqpConnection.publish('orchestrator.order', 'test.order', {
      data: data,
    });
    console.log('msg published');
  }

  @RabbitSubscribe({
    exchange: 'orchestrator.order',
    routingKey: 'test.order',
    queue: 'orchestrator',
  })
  async handleTestRabbitMQ(msg: any) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}
