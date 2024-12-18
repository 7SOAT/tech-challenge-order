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
        `Failed to get all orders: ${JSON.stringify(error.message || error)}`,
      );
      throw error;
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

      this.logger.log(`Orders found: ${order._id}`);
      return order;
    } catch (error) {
      this.logger.error(
        `Failed to get order by Id: ${JSON.stringify(error.message || error)}`,
      );
      throw error;
    }
  }

  async updateOrder(id: string, status: number) {
    const response = await this.orderGateway.updateOrder(id, status);

    this.logger.log(`Order updated with id ${response._id}`);
    return response;
  }
}
