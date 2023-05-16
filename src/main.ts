import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // app.enableCors({
  //   origin: ['http://localhost:3000', 'http://34.172.160.15'],
  //   methods: ['POST', 'PUT', 'DELETE', 'GET'],
  // });
  // app.useGlobalPipes(new ValidationPipe());
  // await app.listen(8000);

  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://34.30.172.108:5672'],
      queue: 'test_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
