import { INestApplication } from '@nestjs/common';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { OrderRoute } from '../../src/api/order/order.route';
import { ControllersModule } from '../../src/adapters/controllers/controllers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  getConnectionToken,
  getModelToken,
  MongooseModule,
} from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';
import { OrderDocument } from '../../src/externals/schemas/order.schema';
import * as request from 'supertest';
import { DefineScenarioFunctionWithAliases } from 'jest-cucumber/dist/src/feature-definition-creation';

const feature = loadFeature(
  path.resolve(__dirname, '../features/order-get-by-id.route.feature'),
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

  scenario('Successfully get order by id', ({ given, when, then, and }) => {
    given(
      'I have a valid order id "d072c976-ccf5-4ad1-9d06-513941213e62"',
      async () => {
        const orderModel = app.get(
          getModelToken('OrderSchema'),
        ) as Model<OrderDocument>;

        await orderModel.create({
          _id: 'd072c976-ccf5-4ad1-9d06-513941213e62',
          status: 0,
          totalValue: 100,
          products: ['1'],
          customer: '1',
          payment: 'CreditCard',
          orderNumber: 2,
        });
      },
    );

    when(
      'I send a GET request to "/orders/d072c976-ccf5-4ad1-9d06-513941213e62"',
      async () => {
        const response = await request(app.getHttpServer()).get(
          '/orders/d072c976-ccf5-4ad1-9d06-513941213e62',
        );

        expect(response).toBeDefined();
      },
    );

    then('the response status code should be 200', async () => {
      const response = await request(app.getHttpServer()).get(
        '/orders/d072c976-ccf5-4ad1-9d06-513941213e62',
      );

      expect(response.status).toBe(200);
    });

    and('the response should contain the order', async () => {
      const response = await request(app.getHttpServer()).get(
        '/orders/d072c976-ccf5-4ad1-9d06-513941213e62',
      );

      expect(response.body).toBeDefined();
      expect(response.body.status).toBe(0);
      expect(response.body.totalValue).toBe(100);
      expect(response.body.products).toEqual(['1']);
      expect(response.body.customer).toBe('1');
      expect(response.body.payment).toBe('CreditCard');
    });
  });

  scenario(
    'Fail to get order by id due to non-existent id',
    ({ given, when, then, and }) => {
      given(
        'I have an invalid order id "c65a5554-bdcf-447a-b5e2-bb06e6aa94b7"',
        async () => {
          const orderModel = app.get(
            getModelToken('OrderSchema'),
          ) as Model<OrderDocument>;

          await orderModel.create({
            _id: '120da061-4254-4bdd-97c0-b7f178bef94e',
            status: 0,
            totalValue: 100,
            products: ['1'],
            customer: '1',
            payment: 'CreditCard',
            orderNumber: 3,
          });
        },
      );

      when(
        'I send a GET request to "/orders/c65a5554-bdcf-447a-b5e2-bb06e6aa94b7"',
        async () => {
          const response = await request(app.getHttpServer()).get(
            '/orders/c65a5554-bdcf-447a-b5e2-bb06e6aa94b7',
          );

          expect(response).toBeDefined();
        },
      );

      then('the response status code should be 500', async () => {
        const response = await request(app.getHttpServer()).get(
          '/orders/a461f1df-65a7-411c-87d1-a66e6656b44c',
        );

        expect(response.status).toBe(500);
      });

      and(
        'the response should contain an error message "Order not found"',
        async () => {
          const response = await request(app.getHttpServer()).get(
            '/orders/c65a5554-bdcf-447a-b5e2-bb06e6aa94b7',
          );

          expect(response.status).toBe(500);
        },
      );
    },
  );
});
