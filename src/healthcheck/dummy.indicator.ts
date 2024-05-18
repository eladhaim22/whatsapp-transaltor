import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

import { Injectable } from '@nestjs/common';

@Injectable()
export class DummyIndicator extends HealthIndicator {
  async isHealthy(): Promise<HealthIndicatorResult> {
    return this.getStatus('dummy', true);
  }
}
