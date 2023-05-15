import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://34.172.160.15'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
