import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService){

  }
  computer(): string {
    this.powerService.supplyPower('cpu service');
    return 'coputer on'
  }
}
