import { Module } from '@nestjs/common';
import RepositoryModule from 'src/externals/repositories/repository.module';
import OrderGateway from './order/order.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from 'src/externals/schemas/order.schema';
import OrderRepository from 'src/externals/repositories/order.repository';

@Module({
  imports: [
    RepositoryModule.register({
      imports: [
        MongooseModule.forFeature([
          { name: 'OrderSchema', schema: OrderSchema },
        ]),
      ],
      providers: [OrderRepository],
      controllers: [],
      exports: [OrderRepository],
    }),
  ],
  controllers: [],
  providers: [OrderGateway],
  exports: [OrderGateway],
})
export default class GatewayModule {}
