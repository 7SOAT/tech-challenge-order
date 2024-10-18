import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateOrderDto from 'src/api/dto/order/create-order.dto';
import { OrderDocument } from '../schemas/order.schema';

@Injectable()
export default class OrderRepository {
  constructor(
    @InjectModel('OrderSchema')
    private readonly orderSchema: Model<OrderDocument>,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const { customerId, productIds } = dto;
    console.log('customerId', customerId);
    console.log('productIds', productIds);
    return await this.orderSchema.create({
      status: 'pending',
      totalValue: 150,
      orderNumber: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  async getOrder(id: string) {
    return await this.orderSchema.findById({ _id: id });
  }

  async getAllOrders() {
    return await this.orderSchema.find();
  }
}
