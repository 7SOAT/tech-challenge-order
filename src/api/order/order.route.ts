import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import OrderController from 'src/adapters/controllers/order.controller';

@ApiTags('orders')
@Controller('orders')
export default class OrderRoute {
  constructor(private readonly _orderController: OrderController) {}

  @Post()
  async create() {
    return await this._orderController.createOrder();
  }

  @Get()
  async getAll() {
    return await this._orderController.getAllOrders();
  }
}
