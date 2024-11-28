import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderController } from '../../adapters/controllers/order.controller';
import { CreateOrderDto } from '../dto/order/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderRoute {
  constructor(private readonly _orderController: OrderController) {}

  @Post()
  async create(@Body() dto: CreateOrderDto) {
    return await this._orderController.createOrder(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      const order = await this._orderController.getOrder(id);

      if (!order) throw new NotFoundException(`Order with id ${id} not found`);

      return order;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async getAll() {
    try {
      const order = await this._orderController.getAllOrders();

      if (!order) throw new NotFoundException(`No orders found`);

      return order;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
