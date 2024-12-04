import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../../../externals/repositories/order.repository';
import { plainToInstance } from 'class-transformer';
import { UpdateOrderResponseDto } from '../../../../src/api/dto/response/update-order.dto';
import { CreateOrderResponseDto } from '../../../../src/api/dto/response/create-order.dto';

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

      const createOrderDto = plainToInstance(CreateOrderResponseDto, result, {
        excludeExtraneousValues: true,
      });

      return createOrderDto;
    } catch (error) {
      this.logger.error(`Failed to create order: ${error.message || error}`);
      throw error;
    }
  }

  async findAll() {
    try {
      const result = await this._orderRepository.getAllOrders();

      const responseOrders = plainToInstance(CreateOrderResponseDto, result, {
        excludeExtraneousValues: true,
      });

      this.logger.log(`Orders found: ${result.length}`);
      return responseOrders;
    } catch (error) {
      this.logger.error(
        `Error occurred when get all orders: ${error.message || error}`,
      );
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const result = await this._orderRepository.getOrder(id);
      const createOrderDto = plainToInstance(CreateOrderResponseDto, result, {
        excludeExtraneousValues: true,
      });
      return createOrderDto;
    } catch (error) {
      this.logger.error(`Failed to get order by Id: ${error.message || error}`);
      throw error;
    }
  }

  async updateOrder(id: string, status: number) {
    try {
      const result = await this._orderRepository.updateOrder(id, status);

      const updateOrderDto = plainToInstance(UpdateOrderResponseDto, result, {
        excludeExtraneousValues: true,
      });

      return updateOrderDto;
    } catch (error) {
      this.logger.error(`Failed to update order: ${error.message || error}`);
      throw error;
    }
  }
}
