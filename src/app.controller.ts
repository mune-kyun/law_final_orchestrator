import { Controller, Get } from '@nestjs/common';

@Controller('/orchestrator/test')
export class AppController {
  @Get('')
  test(): object {
    return { msg: 'success' };
  }
}
