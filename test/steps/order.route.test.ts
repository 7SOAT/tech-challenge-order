import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { DefineScenarioFunctionWithAliases } from 'jest-cucumber/dist/src/feature-definition-creation';
import { OrderRoute } from '../../src/api/order/order.route';
import { INestApplication } from '@nestjs/common';
import {
  getConnectionToken,
  getModelToken,
  MongooseModule,
} from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderDocument } from 'src/externals/schemas/order.schema';
import { Connection, Model } from 'mongoose';
import { ControllersModule } from '../../src/adapters/controllers/controllers.module';

const feature = loadFeature(
  path.resolve(__dirname, '../features/order.route.feature'),
);

defineFeature(feature, (scenario: DefineScenarioFunctionWithAliases) => {
  let app: INestApplication;
  let orderRoute: OrderRoute;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI_TEST'),
          }),
          inject: [ConfigService],
        }),
        ControllersModule,
      ],
      controllers: [OrderRoute],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    orderRoute = moduleFixture.get<OrderRoute>(OrderRoute);
  });

  afterAll(async () => {
    const connection = app.get<Connection>(getConnectionToken());

    const collections = await connection.db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
    }
    await app.close();
  });

  it('should be defined', () => {
    expect(orderRoute).toBeDefined();
  });

  scenario('Successfully retrieve all orders', ({ given, when, then }) => {
    given('the order service is available', async () => {
      // Mock the order service to return a list of orders
      const orderModel = app.get(
        getModelToken('OrderSchema'),
      ) as Model<OrderDocument>;

      await orderModel.create({
        status: 0,
        totalValue: 100,
        products: ['1'],
        customer: '1',
        payment: 'CreditCard',
        orderNumber: 1,
      });
    });

    when('I send a GET request to "/orders"', async () => {
      const response = await request(app.getHttpServer()).get('/orders');

      expect(response).toBeDefined();
    });

    then('I should receive a 200 status code', async () => {
      const response = await request(app.getHttpServer()).get('/orders');

      expect(response.status).toBe(200);
    });

    then('the response should contain a list of orders', async () => {
      const response = await request(app.getHttpServer()).get('/orders');

      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0].status).toBe(0);
      expect(response.body[0].totalValue).toBe(100);
      expect(response.body[0].products).toEqual(['1']);
      expect(response.body[0].customer).toBe('1');
      expect(response.body[0].payment).toBe('CreditCard');
    });
  });

  scenario('No orders found', ({ given, when, then }) => {
    given('the order service is available', async () => {
      const orderModel = app.get(
        getModelToken('OrderSchema'),
      ) as Model<OrderDocument>;

      await orderModel.deleteMany({});
    });

    when('I send a GET request to "/orders"', async () => {
      const response = await request(app.getHttpServer()).get('/orders');

      expect(response).toBeDefined();
    });

    then('I should receive a 500 status code', async () => {
      const response = await request(app.getHttpServer()).get('/orders');

      expect(response.status).toBe(500);
    });

    then('the response should contain "No orders found"', async () => {
      const response = await request(app.getHttpServer()).get('/orders');

      expect(response.body.message).toBe('No orders found');
    });
  });
});
