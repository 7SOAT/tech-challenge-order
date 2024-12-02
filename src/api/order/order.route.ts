import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OrderController } from '../../adapters/controllers/order.controller';
import { CreateOrderDto } from '../dto/order/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderRoute {
  constructor(private readonly _orderController: OrderController) {}

  @Post()
  @ApiOkResponse({ description: 'Order created' })
  @ApiInternalServerErrorResponse({ description: 'Failed to create order' })
  async create(@Body() dto: CreateOrderDto) {
    return await this._orderController.createOrder(dto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Order details' })
  @ApiNotFoundResponse({ description: 'Order not found' })
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
  @ApiOkResponse({ description: 'List of orders' })
  @ApiNotFoundResponse({ description: 'No orders found' })
  async getAll() {
    try {
      const orders = await this._orderController.getAllOrders();

      return orders;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
