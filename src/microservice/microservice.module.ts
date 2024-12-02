import { Module } from '@nestjs/common';
import { MicroServiceService } from './microservice.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [MicroServiceService],
  exports: [MicroServiceService],
})
export class MicroserviceModule {}
