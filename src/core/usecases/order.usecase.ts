import { Injectable } from '@nestjs/common';
import { OrderGateway } from 'src/adapters/gateways/order/order.gateway';

@Injectable()
export class OrderUseCase {
  constructor(private readonly orderGateway: OrderGateway) {}

  async create(customer: any, products: any) {
    return await this.orderGateway.create(customer, products);
  }

  async getAll() {
    return await this.orderGateway.findAll();
  }

  async getOrderById(id: string) {
    return await this.orderGateway.findById(id);
  }
}
