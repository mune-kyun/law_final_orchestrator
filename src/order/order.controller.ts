import { Body, Controller, Get, Post, Inject } from '@nestjs/common';
import { CustomJwt } from 'src/auth/decorator';
import { JwtDTO } from 'src/auth/dto';
import { CreateReqDto } from './dto';
import { OrderService } from './order.service';

@Controller('/orchestrator/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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
