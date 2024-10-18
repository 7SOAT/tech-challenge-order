import { Injectable } from '@nestjs/common';
import OrderRepository from 'src/externals/repositories/order.repository';

@Injectable()
export default class OrderGateway {
  constructor(private _orderRepository: OrderRepository) {}

  async findAll() {
    try {
      const result = await this._orderRepository.getAllOrders();
      return result;
    } catch (error) {
      throw new Error(`Error finding all orders: ${error}`);
    }
  }
}
