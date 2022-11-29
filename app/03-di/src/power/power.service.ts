import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(powerby: string) {
    console.log(`supply Power by ${powerby}`);
  }
}
