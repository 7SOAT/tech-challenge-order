import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { MicroserviceModule } from '../../microservice/microservice.module';
import { OrderController } from './order.controller';
import { JwtHelperModule } from '../../package/jwt-helper/jwt-helper.module';

@Module({
  imports: [CoreModule, MicroserviceModule, JwtHelperModule],
  controllers: [],
  providers: [OrderController],
  exports: [OrderController],
})
export class ControllersModule {}
