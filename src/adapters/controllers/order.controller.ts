import { Injectable } from '@nestjs/common';
import OrderRepository from 'src/externals/repositories/order.repository';

@Injectable()
export default class OrderController {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder() {
    return await this.orderRepository.createOrder();
  }

  getOrder() {
    // implementation
  }

  async getAllOrders() {
    // implementation
    return await this.orderRepository.getAllOrders();
  }
}
