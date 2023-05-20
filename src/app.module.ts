import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { rabbitMQHost } from './utils';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'test',
          type: 'direct',
        },
      ],
      uri: `amqp://${rabbitMQHost}`,
      enableControllerDiscovery: true,
      connectionInitOptions: { wait: false },
    }),
    AuthModule,
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
