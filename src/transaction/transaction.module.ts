import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { rabbitMQHost } from 'src/utils';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'orchestrator.transaction',
          type: 'topic',
        },
      ],
      uri: `amqp://${rabbitMQHost}`,
      connectionInitOptions: { wait: false },
    }),
    TransactionModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
