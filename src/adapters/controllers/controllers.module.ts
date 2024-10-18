import { Module } from '@nestjs/common';
import OrderController from './order.controller';
import CoreModule from 'src/core/core.module';
import { MicroserviceModule } from 'src/microservice/microservice.module';

@Module({
  imports: [CoreModule, MicroserviceModule],
  controllers: [],
  providers: [OrderController],
  exports: [OrderController],
})
export default class ControllersModule {}
