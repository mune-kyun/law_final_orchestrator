import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { CustomJwt } from 'src/auth/decorator';
import { JwtDTO } from 'src/auth/dto';
import { CreateReqDto } from './dto';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('/orchestrator/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  async createOrder(
    @CustomJwt(JwtDTO) jwt: any,
    @Body() body: CreateOrderDto,
    @Res() response: Response,
  ) {
    const data = await this.orderService.createOrder(jwt, body);

    if (!data) response.status(HttpStatus.FORBIDDEN).send(null);
    else response.status(HttpStatus.OK).send(data);
  }

  // Test
  @Get('/publish-rabbit')
  async publishRabbit() {
    this.orderService.publishRabbit();
    console.log('msg published');
  }

  @Post('/post-rabbit')
  async postRabbit(@CustomJwt(JwtDTO) jwt: any, @Body() body: CreateReqDto) {
    this.orderService.postRabbit(jwt, body);
    console.log('msg published');
  }
}
