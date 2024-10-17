import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export interface OrderDocument extends Document {
  status: string;
  totalValue: number;
  orderNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export default class OrderRepository {
  constructor(
    @InjectModel('OrderSchema')
    private readonly orderSchema: Model<OrderDocument>,
  ) {}

  async createOrder() {
    return await this.orderSchema.create({
      status: 'pending',
      totalValue: 150,
      orderNumber: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  getOrder() {
    // implementation
  }

  async getAllOrders() {
    // implementation
    return await this.orderSchema.find();
  }
}
