import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RouteModule from './api/route.module';
import { MongooseModule } from '@nestjs/mongoose';
import RepositoryModule from './externals/repositories/repository.module';
import OrderController from './adapters/controllers/order.controller';
import OrderRoute from './api/order/order.route';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    RepositoryModule.register({
      imports: [],
      providers: [],
      controllers: [],
      exports: [],
    }),
    RouteModule.register({
      imports: [RepositoryModule.register({})],
      providers: [OrderController],
      controllers: [OrderRoute],
      exports: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
