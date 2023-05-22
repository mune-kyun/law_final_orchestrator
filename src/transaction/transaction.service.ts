import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { catchError, map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

import { JwtDTO } from 'src/auth/dto';
import { authHost } from 'src/utils';
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

    await this.amqpConnection.publish('transaction', 'status.transaction', {
      token: jwt,
      id: dto.id,
      status: dto.status,
    });

    // TODO: if accept change status order, else delete order
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

    // TODO: if accept change status order, else delete order
    return null;
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
