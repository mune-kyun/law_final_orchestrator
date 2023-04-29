import { Controller, Get } from '@nestjs/common';

@Controller('/test')
export class AppController {
  @Get('')
  test(): object {
    return { msg: 'success' };
  }
}
