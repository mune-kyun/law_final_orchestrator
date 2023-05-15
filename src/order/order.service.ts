import { Injectable } from '@nestjs/common';
import { CreateReqDto } from './dto';

@Injectable()
export class OrderService {
  create(body: CreateReqDto) {
    const { name, description } = body;
    return { name, description };
  }
}
