import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthz(): string {
    return 'OK';
  }
}
