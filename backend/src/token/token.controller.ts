import { Controller, Post, Body } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('generate')
  generateToken(@Body('userId') userId: string) {
    return this.tokenService.generateToken(userId);
  }

  @Post('validate')
  validateToken(@Body('token') token: string) {
    return { valid: this.tokenService.validateToken(token) };
  }
}
