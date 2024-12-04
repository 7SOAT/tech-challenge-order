import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../../../src/adapters/controllers/order.controller';
import { OrderUseCase } from '../../../src/core/usecases/order.usecase';
import { MicroServiceService } from '../../../src/microservice/microservice.service';
import { JwtHelperService } from '../../../src/package/jwt-helper/jwt-helper.service';
import { ProductsResponseDto } from '../../../src/microservice/dto/product-response.dto';
import { CreateOrderDto } from '../../../src/api/dto/order/create-order.dto';
import { CreateOrderResponseDto } from 'src/api/dto/response/create-order.dto';
import { UpdateOrderResponseDto } from 'src/api/dto/response/update-order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderUseCase: OrderUseCase;
  let microService: MicroServiceService;
  let jwtHelperService: JwtHelperService;

  beforeAll(async () => {
    const mockOrderUseCase = {
      create: jest.fn(),
      getOrderById: jest.fn(),
      getAll: jest.fn(),
      updateOrder: jest.fn(),
    };

    const mockMicroService = {
      getCustomerByDocument: jest.fn(),
      getProductsById: jest.fn(),
    };

    const mockJwtHelperService = {
      decodeToken: jest.fn(),
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        OrderController,
        { provide: OrderUseCase, useValue: mockOrderUseCase },
        { provide: MicroServiceService, useValue: mockMicroService },
        { provide: JwtHelperService, useValue: mockJwtHelperService },
      ],
    }).compile();

    orderController = moduleFixture.get<OrderController>(OrderController);
    orderUseCase = moduleFixture.get<OrderUseCase>(OrderUseCase);
    microService = moduleFixture.get<MicroServiceService>(MicroServiceService);
    jwtHelperService = moduleFixture.get<JwtHelperService>(JwtHelperService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
    expect(orderUseCase).toBeDefined();
    expect(microService).toBeDefined();
    expect(jwtHelperService).toBeDefined();
  });

  it('should create an order', async () => {
    const createOrderDto: CreateOrderDto = {
      productIds: [
        '11111-11111-11111-11111-11111',
        '22222-22222-22222-22222-22222',
      ],
      document: '12345678910',
    };

    const token = {
      token: 'token',
    };

    const decoded = {};

    const responseProducts: Array<ProductsResponseDto> = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        category: 'Category 1',
        description: 'Description 1',
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        category: 'Category 2',
        description: 'Description 2',
      },
    ];

    const order: CreateOrderResponseDto = {
      _id: 'orderId',
      status: 0,
      totalValue: 300,
      products: ['1', '2'],
      customer: 'customerId',
      payment: 'CreditCard',
      orderNumber: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    jest.spyOn(microService, 'getCustomerByDocument').mockResolvedValue(token);

    jest.spyOn(jwtHelperService, 'decodeToken').mockReturnValue(decoded);

    jest
      .spyOn(microService, 'getProductsById')
      .mockResolvedValue(responseProducts[0]);

    jest
      .spyOn(microService, 'getProductsById')
      .mockResolvedValue(responseProducts[1]);

    jest.spyOn(orderUseCase, 'create').mockResolvedValue({
      ...order,
    });

    const result = await orderController.createOrder(createOrderDto);

    expect(result).toEqual(order);
  });

  it('should get an order by id', async () => {
    const orderId = 'orderId';
    const order = {
      _id: 'orderId',
      status: 0,
      totalValue: 300,
      products: ['1', '2'],
      customer: 'customerId',
      payment: 'CreditCard',
      orderNumber: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    jest.spyOn(orderUseCase, 'getOrderById').mockResolvedValue(order);
    const result = await orderController.getOrder(orderId);
    expect(result).toEqual(order);
  });

  it('should get all orders', async () => {
    const orders = [
      {
        _id: 'orderId',
        status: 0,
        totalValue: 300,
        products: ['1', '2'],
        customer: 'customerId',

        payment: 'CreditCard',
        orderNumber: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    jest.spyOn(orderUseCase, 'getAll').mockResolvedValue(orders);

    const result = await orderController.getAllOrders();

    expect(result).toEqual(orders);
  });

  it('should update an order', async () => {
    const dto = {
      id: 'orderId',
      status: 1,
    };

    const order: UpdateOrderResponseDto = {
      _id: 'orderId',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 0,
      totalValue: 300,
      products: ['1', '2'],
      customer: 'customerId',
      payment: 'CreditCard',
      orderNumber: 1,
    };

    jest.spyOn(orderUseCase, 'updateOrder').mockResolvedValue(order);

    const result = await orderController.updateOrder(dto);

    expect(result).toEqual(order);
  });

  it('should throw an error when create order fails', async () => {
    const createOrderDto: CreateOrderDto = {
      productIds: [
        '11111-11111-11111-11111-11111',
        '22222-22222-22222-22222-22222',
      ],
      document: '12345678910',
    };

    jest
      .spyOn(microService, 'getCustomerByDocument')
      .mockRejectedValue(new Error('Error'));
    try {
      await orderController.createOrder(createOrderDto);
    } catch (error) {
      expect(error.message).toBe('Error');
    }
  });
});
