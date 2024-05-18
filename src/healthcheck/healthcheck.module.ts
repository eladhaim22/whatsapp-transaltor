import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DummyIndicator } from './dummy.indicator';
import { HealthCheckController } from './healthcheck.controller';

@Module({
  controllers: [HealthCheckController],
  imports: [TerminusModule],
  providers: [DummyIndicator],
})
export class HealthcheckModule {}
