import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQHost } from 'src/utils';
import { OrderService } from './order.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'orchestrator.order',
          type: 'topic',
        },
        {
          name: 'transaction',
          type: 'topic',
        },
      ],
      uri: `amqp://${rabbitMQHost}`,
      connectionInitOptions: { wait: false },
    }),
    HttpModule,
    OrderModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
