import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Decimal } from "@prisma/client/runtime/library";

@Injectable()
export class DecimalPipe implements PipeTransform {
  constructor(private readonly errorMessage: string = 'Invalid value') {}

  transform(value: any) {
    if (!value || isNaN(Number(value)))
      throw new BadRequestException(this.errorMessage);

    return new Decimal(value);
  }
}