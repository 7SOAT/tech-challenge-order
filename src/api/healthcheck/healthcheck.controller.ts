import { ApiTags } from '@nestjs/swagger';
import { HealthcheckService } from './healthcheck.service';
import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@ApiTags('healthcheck')
@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get()
  @HealthCheck()
  public async checkHealth(): Promise<void> {
    await this.healthcheckService.checkHealth();
  }
}
