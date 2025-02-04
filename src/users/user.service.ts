import { Injectable, BadRequestException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  public async getBalance(id: number) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user)
      throw new BadRequestException('User not found');

    return user.balance;
  }

  public async payment(id: number, amount: Decimal) {
    if (amount.lt(0))
      throw new BadRequestException('Invalid amount: must be equal or greater than 0');

    return await this.prismaService.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id } });
      if (!user)
        throw new BadRequestException('User not found');

      if (new Decimal(user.balance).lt(amount))
        throw new BadRequestException('Not enough balance');

      const updatedUser = await tx.user.update({
        where: { id },
        data: { balance: { decrement: amount } }
      });

      await tx.history.create({
        data: {
          userId: id,
          action: 'PAYED',
          amount
        }
      });

      return updatedUser;
    });
  }
}
