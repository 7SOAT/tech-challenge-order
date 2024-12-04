import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { OrderSchema } from './externals/schemas/order.schema';
import mongoose, { model } from 'mongoose';
import { randomInt } from 'crypto';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Tech Challenge Order API')
    .setDescription('Application for orders.')
    .setVersion('1.0')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('API_PORT');
  const INIT_BD = configService.get<boolean>('INIT_BD');
  await mongoose.connect(configService.get<string>('MONGODB_URI'), {});
  await app.listen(PORT);

  if (INIT_BD) {
    await insertInitialData();
  }
}

async function insertInitialData() {
  const data = [
    {
      status: 1,
      totalValue: 100.0,
      products: ['product1', 'product2'],
      customer: 'customer1',
      payment: 'payment1',
      orderNumber: randomInt(1, 1000),
    },
    {
      status: 2,
      totalValue: 200.0,
      products: ['product3', 'product4'],
      customer: 'customer2',
      payment: 'payment2',
      orderNumber: randomInt(1, 1000),
    },
  ];

  const OrderModel = model('OrderSchema', OrderSchema);
  await OrderModel.insertMany(data);
  console.log('Initial data inserted');
}

bootstrap();
