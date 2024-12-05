import { Controller, Get } from '@nestjs/common';

@Controller('root')
export class RootController {
  @Get()
  getRoot(): string {
    return 'Welcome to the Root Controller!';
  }
}
