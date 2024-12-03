import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../../../externals/repositories/order.repository';
import { plainToClass } from 'class-transformer';
import { UpdateOrderResponseDto } from '../../../../src/api/dto/response/update-order.dto';

@Injectable()
export class OrderGateway {
  private readonly logger = new Logger(OrderGateway.name, {
    timestamp: true,
  });
  constructor(private _orderRepository: OrderRepository) {}

  async create(customer: string, products: any) {
    try {
      const result = await this._orderRepository.createOrder(
        customer,
        products,
      );
      return result;
    } catch (error) {
      this.logger.error(`Failed to create order: ${error.message || error}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this._orderRepository.getAllOrders();

      this.logger.log(`Orders found: ${result.length}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Failed to fetch data from microservice: ${error.message || error}`,
      );
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const result = await this._orderRepository.getOrder(id);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateOrder(id: string, status: string) {
    try {
      const result = await this._orderRepository.updateOrder(id, status);

      const updateOrderDto = plainToClass(UpdateOrderResponseDto, result);

      return updateOrderDto;
    } catch (error) {
      this.logger.error(`Failed to update order: ${error.message || error}`);
      throw error;
    }
  }
}
