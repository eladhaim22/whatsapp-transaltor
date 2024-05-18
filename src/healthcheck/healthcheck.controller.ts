import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

import { DummyIndicator } from './dummy.indicator';

@Controller('healthcheck')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private dummyIndicator: DummyIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([() => this.dummyIndicator.isHealthy()]);
  }
}
