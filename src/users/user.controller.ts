import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { DecimalPipe } from 'src/pipes/decimal.pipe';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/balance')
  async getBalance(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getBalance(id);
  }

  @Post(':id/payment')
  async payment(@Param('id', ParseIntPipe) id: number, @Body('amount', new DecimalPipe('Invalid amount: must be a valid decimal number')) amount: Decimal) {
    return await this.userService.payment(id, amount);
  }
}
