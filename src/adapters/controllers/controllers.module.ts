import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { MicroserviceModule } from 'src/microservice/microservice.module';
import { OrderController } from './order.controller';

@Module({
  imports: [CoreModule, MicroserviceModule],
  controllers: [],
  providers: [OrderController],
  exports: [OrderController],
})
export class ControllersModule {}
