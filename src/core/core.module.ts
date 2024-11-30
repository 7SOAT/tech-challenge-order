import { Module } from '@nestjs/common';
import { OrderUseCase } from './usecases/order.usecase';
import { GatewayModule } from '../adapters/gateways/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [],
  providers: [OrderUseCase],
  exports: [OrderUseCase],
})
export class CoreModule {}
