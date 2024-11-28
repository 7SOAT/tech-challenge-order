import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/externals/repositories/order.repository';
import { CustomerResponseDto } from 'src/microservice/dto/customer-response.dto';

@Injectable()
export class OrderGateway {
  constructor(private _orderRepository: OrderRepository) {}

  async create(customer: CustomerResponseDto, products: any) {
    try {
      const result = await this._orderRepository.createOrder(
        customer,
        products,
      );
      return result;
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }

  async findAll() {
    try {
      const result = await this._orderRepository.getAllOrders();
      return result;
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }

  async findById(id: string) {
    try {
      const result = await this._orderRepository.getOrder(id);
      return result;
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }
}
