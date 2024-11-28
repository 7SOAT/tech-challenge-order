import { INestApplication } from '@nestjs/common';
import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { OrderController } from '../../src/adapters/controllers/order.controller';
import { TestingModule, Test } from '@nestjs/testing';
import * as request from 'supertest';
import { RouteModule } from '../../src/api/route.module';

const feature = loadFeature(
  path.resolve(__dirname, '../features/order.route.feature'),
);
defineFeature(feature, (scenario) => {
  let app: INestApplication;
  let mockOrderController: Partial<OrderController>;

  beforeAll(async () => {
    mockOrderController = {
      getAllOrders: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RouteModule.register({
          imports: [],
          providers: [
            {
              provide: OrderController,
              useValue: mockOrderController,
            },
          ],
          controllers: [],
          exports: [],
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  scenario('Successfully retrieve all orders', ({ given, when, then, and }) => {
    let response: request.Response;

    given('the order service is available', () => {
      (mockOrderController.getAllOrders as jest.Mock).mockResolvedValue([
        { id: '1', product: 'Product 1', quantity: 2 },
        { id: '2', product: 'Product 2', quantity: 1 },
      ]);
    });

    when('I send a GET request to "/orders"', async () => {
      response = await request(app.getHttpServer()).get('/orders');
    });

    then('I should receive a 200 status code', () => {
      expect(response.status).toBe(200);
    });

    and('the response should contain a list of orders', () => {
      expect(response.body).toEqual([
        { id: '1', product: 'Product 1', quantity: 2 },
        { id: '2', product: 'Product 2', quantity: 1 },
      ]);
    });
  });

  scenario('No orders found', ({ given, when, then, and }) => {
    let response: request.Response;

    given('the order service is available', () => {
      (mockOrderController.getAllOrders as jest.Mock).mockResolvedValue([]);
    });

    when('I send a GET request to "/orders"', async () => {
      response = await request(app.getHttpServer()).get('/orders');
    });

    then('I should receive a 404 status code', () => {
      expect(response.status).toBe(404);
    });

    and('the response should contain "No orders found"', () => {
      expect(response.body).toEqual({ message: 'No orders found' });
    });
  });

  scenario('Internal server error', ({ given, when, then, and }) => {
    let response: request.Response;

    given('the order service is unavailable', () => {
      (mockOrderController.getAllOrders as jest.Mock).mockRejectedValue(
        new Error('Internal server error'),
      );
    });

    when('I send a GET request to "/orders"', async () => {
      response = await request(app.getHttpServer()).get('/orders');
    });

    then('I should receive a 500 status code', () => {
      expect(response.status).toBe(404);
    });

    and('the response should contain an error message', () => {
      expect(response.body).toEqual({ error: 'Not Found' });
    });
  });
});
