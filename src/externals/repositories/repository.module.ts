import { DynamicModule, Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from '../schemas/order.schema';
import OrderRepository from './order.repository';

interface RepositoryModuleConfig {
  imports?: any[];
  providers?: any[];
  controllers?: any[];
  exports?: any[];
}

@Global()
@Module({})
export default class RepositoryModule {
  static register(config: RepositoryModuleConfig): DynamicModule {
    return {
      module: RepositoryModule,
      imports: config.imports || [
        MongooseModule.forFeature([
          { name: 'OrderSchema', schema: OrderSchema },
        ]),
      ],
      providers: config.providers || [OrderRepository],
      controllers: config.controllers || [],
      exports: config.exports || [OrderRepository],
    };
  }
}
