import { Controller, Get } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Controller('/orchestrator/test')
export class AppController {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @Get('')
  test(): object {
    return { msg: 'success' };
  }

  @Get('/publish-rabbit')
  async publishRabbit() {
    const data = { username: 'test' };
    await this.amqpConnection.publish('test', 'test-receive', {
      data: data,
    });
    console.log('msg published');
  }

  @RabbitSubscribe({
    exchange: 'test',
    routingKey: 'test-receive',
    queue: 'orchestrator',
  })
  async handleTestRabbitMQ(msg: any) {
    console.log(`Received message: ${JSON.stringify(msg)}`);
  }
}
