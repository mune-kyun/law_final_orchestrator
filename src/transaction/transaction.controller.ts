import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { CustomJwt } from 'src/auth/decorator';
import { JwtDTO } from 'src/auth/dto';
import { TransactionService } from './transaction.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('/orchestrator/transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('/update-status')
  async createOrder(
    @CustomJwt(JwtDTO) jwt: any,
    @Body() body: UpdateTransactionDto,
    @Res() response: Response,
  ) {
    await this.transactionService.updateTransaction(jwt, body);

    response.status(HttpStatus.OK).send({ msg: 'update being processed' });
  }
}
