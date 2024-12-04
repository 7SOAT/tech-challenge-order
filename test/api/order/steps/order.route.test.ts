import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { TestingModule, Test } from '@nestjs/testing';
import { OrderRoute } from '../../../../src/api/order/order.route';
import { INestApplication } from '@nestjs/common';
import { OrderController } from '../../../../src/adapters/controllers/order.controller';
import { CreateOrderDto } from '../../../../src/api/dto/order/create-order.dto';
import { randomUUID } from 'crypto';
import { UpdateOrderDto } from '../../../../src/api/dto/order/update-order.dto';

const feature = loadFeature(
  path.resolve(__dirname, '../features/order.route.feature'),
);

defineFeature(feature, (scenario) => {
  let app: INestApplication;
  let orderRoute: OrderRoute;
  let orderController: OrderController;

  const mockOrderController = {
    getOrder: jest.fn(),
    createOrder: jest.fn(),
    getAllOrders: jest.fn(),
    updateOrder: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [OrderRoute],
      providers: [
        {
          provide: OrderController,
          useValue: mockOrderController,
        },
      ],
    }).compile();

    orderController = moduleFixture.get<OrderController>(OrderController);
    app = moduleFixture.createNestApplication();
    await app.init();

    orderRoute = moduleFixture.get<OrderRoute>(OrderRoute);
  });

  afterAll(async () => {
    jest.clearAllMocks();
    await app.close();
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
    expect(orderRoute).toBeDefined();
  });
  scenario('Create a new order', ({ given, when, then }) => {
    let response: any;
    const dto: CreateOrderDto = {
      document: '123456789',
      productIds: [randomUUID(), randomUUID()],
    };

    given('I have a valid order payload', () => {
      mockOrderController.createOrder.mockResolvedValue({ id: '123', ...dto });
    });

    when('I send a POST request to "/orders"', async () => {
      jest.spyOn(orderController, 'createOrder').mockResolvedValue({
        _id: '123',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customer: '123456789',
        products: dto.productIds,
        status: 0,
        orderNumber: 123,
        payment: 'credit_card',
        totalValue: 100,
      });
      response = await orderRoute.create(dto);
    });

    then('I should receive a response with a status code of 201', () => {
      expect(response).toBeDefined();
    });

    then('the response should indicate that the order was created', () => {
      expect(mockOrderController.createOrder).toHaveBeenCalledWith(dto);
    });
  });

  scenario('Get order details by ID', ({ given, when, then }) => {
    let response: any;
    const id = '123';

    given('I have a valid order ID', () => {
      mockOrderController.getOrder.mockResolvedValue({ id, status: 'new' });
    });

    when('I send a GET request to "/orders/{id}"', async () => {
      response = await orderRoute.get(id);
    });

    then('I should receive a response with a status code of 200', () => {
      expect(response).toHaveProperty('id', id);
    });

    then('the response should contain the order details', () => {
      expect(mockOrderController.getOrder).toHaveBeenCalledWith(id);
    });
  });

  scenario('List all orders', ({ when, then }) => {
    let response: any;

    when('I send a GET request to "/orders"', async () => {
      mockOrderController.getAllOrders.mockResolvedValue([{ id: '123' }]);
      response = await orderRoute.getAll();
    });

    then('I should receive a response with a status code of 200', () => {
      expect(response).toEqual([{ id: '123' }]);
    });

    then('the response should contain a list of orders', () => {
      expect(mockOrderController.getAllOrders).toHaveBeenCalled();
    });
  });

  scenario("Update an order's status", ({ given, when, then }) => {
    let response: any;
    const dto: UpdateOrderDto = { id: '123', status: 0 };

    given('I have a valid order update payload', () => {
      mockOrderController.updateOrder.mockResolvedValue(dto);
    });

    when('I send a PUT request to "/orders"', async () => {
      response = await orderRoute.update(dto);
    });

    then('I should receive a response with a status code of 200', () => {
      expect(response).toEqual(dto);
    });

    then('the response should indicate that the order was updated', () => {
      expect(mockOrderController.updateOrder).toHaveBeenCalledWith(dto);
    });
  });
});
