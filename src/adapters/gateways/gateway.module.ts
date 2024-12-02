import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderRepository } from '../../externals/repositories/order.repository';
import { RepositoryModule } from '../../externals/repositories/repository.module';
import { OrderSchema } from '../../externals/schemas/order.schema';
import { OrderGateway } from './order/order.gateway';

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
export class GatewayModule {}
