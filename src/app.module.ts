import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, OrderModule],
  controllers: [AppController],
})
export class AppModule {}
