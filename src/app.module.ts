import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MicroserviceModule } from './microservice/microservice.module';
import { RepositoryModule } from './externals/repositories/repository.module';
import { RouteModule } from './api/route.module';
import { ControllersModule } from './adapters/controllers/controllers.module';
import { OrderRoute } from './api/order/order.route';
import { HealthcheckModule } from './api/healthcheck/healthcheck.module';

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
    RepositoryModule,
    RouteModule.register({
      imports: [ControllersModule],
      providers: [],
      controllers: [OrderRoute],
      exports: [],
    }),
    MicroserviceModule,
    HealthcheckModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
