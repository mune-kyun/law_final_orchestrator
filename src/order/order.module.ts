import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQHost } from 'src/utils';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'orchestrator.order',
          type: 'topic',
        },
      ],
      uri: `amqp://${rabbitMQHost}`,
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: false },
    }),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
