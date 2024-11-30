import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderGateway } from '../../adapters/gateways/order/order.gateway';

@Injectable()
export class OrderUseCase {
  private readonly logger = new Logger(OrderUseCase.name, {
    timestamp: true,
  });

  constructor(private readonly orderGateway: OrderGateway) {}

  async create(customer: any, products: any) {
    return await this.orderGateway.create(customer, products);
  }

  async getAll() {
    try {
      const orders = await this.orderGateway.findAll();

      if (!orders || orders.length === 0) {
        throw new NotFoundException('No orders found');
      }

      return orders;
    } catch (error) {
      this.logger.error(
        `Failed to fetch data from microservice: ${error.message || error}`,
      );
      throw new HttpException(
        `Failed to fetch data from microservice: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrderById(id: string) {
    try {
      const order = await this.orderGateway.findById(id);

      if (!order) {
        this.logger.error(`Order with id ${id} not found`);
        throw new HttpException(
          `Order with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return order;
    } catch (error) {
      this.logger.error(
        `Failed to fetch data from microservice: ${error.message || error}`,
      );
      throw new HttpException(
        `Failed to fetch data from microservice: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
