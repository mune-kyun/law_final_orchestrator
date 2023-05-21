import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { rabbitMQHost } from 'src/utils';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'orchestrator.transaction',
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
    TransactionModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
