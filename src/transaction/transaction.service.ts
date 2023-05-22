import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

import { JwtDTO } from 'src/auth/dto';
import { authHost, orderHost, transactionHost } from 'src/utils';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { DeleteTransactionDto } from './dto';

@Injectable()
export class TransactionService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly httpService: HttpService,
  ) {}

  async updateTransaction(jwt: JwtDTO, dto: UpdateTransactionDto) {
    const user = await this.verify(jwt);
    // console.log(user);
    if (!user) return null;

    // change transaction status
    await this.amqpConnection.publish('transaction', 'status.transaction', {
      token: jwt,
      id: dto.id,
      status: dto.status,
    });

    // delete order if the status is rejected
    if (dto.status == 'REJECTED') {
      try {
        await this.deleteOrderHttp(dto.order_id);
      } catch (error) {}
    }
    return null;
  }

  async deleteTransaction(jwt: JwtDTO, dto: DeleteTransactionDto) {
    const user = await this.verify(jwt);
    // console.log(user);
    if (!user) return null;

    await this.amqpConnection.publish('transaction', 'delete.transaction', {
      token: jwt,
      id: dto.id,
    });

    return null;
  }

  async deleteOrderHttp(order_id: any): Promise<any> {
    const { data }: any = await firstValueFrom(
      this.httpService.delete<any>(`${orderHost}order/${order_id}`).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
      ),
    );
    return data;
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
}
