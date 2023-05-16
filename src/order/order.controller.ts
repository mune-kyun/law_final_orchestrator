import { Body, Controller, Get, Post, Inject } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateReqDto } from './dto';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject('SEND_QUEUE') private readonly client: ClientProxy,
  ) {}

  @Post()
  login(@Body() dto: CreateReqDto) {
    return this.orderService.create(dto);
  }

  @Get('/test')
  patty(): any {
    try {
      this.client.emit('hello2', 'Hello from orchestrator law');
      return { msg: 'tingtun' };
    } catch (error) {}
  }

  @EventPattern('hello')
  hello(data: string) {
    console.log(data);
  }
}
