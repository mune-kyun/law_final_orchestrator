import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

import { CreateReqDto } from './dto';
import { JwtDTO } from 'src/auth/dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { authHost } from 'src/utils';

@Injectable()
export class OrderService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly httpService: HttpService,
  ) {}

  async createOrder(jwt: JwtDTO, dto: CreateOrderDto) {
    const user = await this.verify(jwt);
    // console.log(user);
    if (!user) return null;

    // TODO: guard product

    // TODO: publish to order
    // await this.amqpConnection.publish('orchestrator.order', 'test.order', {
    //   jwt,
    // });

    // TODO: publish to product

    // TODO: publish to transaction

    return { jwt, id: dto.product_id };
  }

  async verify(jwt: JwtDTO): Promise<any> {
    const { data }: any = await firstValueFrom(
      this.httpService
        .post<any>(`${authHost}token/verify/`, { token: jwt })
        .pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  // Test

  async publishRabbit() {
    const data = { username: 'order' };
    await this.amqpConnection.publish('orchestrator.order', 'test.order', {
      data: data,
    });
  }

  async postRabbit(jwt: any, body: CreateReqDto) {
    await this.amqpConnection.publish('orchestrator.order', 'test.otherorder', {
      user: body.name,
      jwt,
    });
  }

  @RabbitSubscribe({
    exchange: 'orchestrator.order',
    routingKey: 'test.order',
    queue: 'test.order',
  })
  public async pubSubHandler(msg: any) {
    console.log(`Received message 1: ${JSON.stringify(msg)}`);
  }

  @RabbitSubscribe({
    exchange: 'orchestrator.order',
    routingKey: 'test.otherorder',
    queue: 'test.otherorder',
  })
  public async pubSubHandler2(msg: any) {
    console.log(`Received message 2: ${JSON.stringify(msg)}`);
  }
}
