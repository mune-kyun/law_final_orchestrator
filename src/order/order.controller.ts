import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateReqDto } from './dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  login(@Body() dto: CreateReqDto) {
    return this.orderService.create(dto);
  }

  @EventPattern('hello')
  hello(data: string) {
    console.log(data);
  }
}
