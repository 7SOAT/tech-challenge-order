import { Module } from '@nestjs/common';
import { HealthcheckService } from './healthcheck.service';
import { HealthcheckController } from './healthcheck.controller';

@Module({
  imports: [],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
  exports: [HealthcheckService],
})
export class HealthcheckModule {}
