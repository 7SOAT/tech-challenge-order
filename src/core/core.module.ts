import { Module } from '@nestjs/common';
import GatewayModule from 'src/adapters/gateways/gateway.module';
import OrderUseCase from './usecases/order.usecase';

@Module({
  imports: [GatewayModule],
  controllers: [],
  providers: [OrderUseCase],
  exports: [OrderUseCase],
})
export default class CoreModule {}
