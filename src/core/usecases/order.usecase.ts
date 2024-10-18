import { Injectable } from '@nestjs/common';
import OrderGateway from 'src/adapters/gateways/order/order.gateway';

@Injectable()
export default class OrderUseCase {
  constructor(private readonly orderGateway: OrderGateway) {}

  async getAll() {
    return await this.orderGateway.findAll();
  }
}
