import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQHost } from 'src/utils';
import { OrderService } from './order.service';

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
      connectionInitOptions: { wait: false },
    }),
    OrderModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
