import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from '../schemas/order.schema';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel('OrderSchema')
    private readonly orderSchema: Model<OrderDocument>,
  ) {}

  async createOrder(customer: any, products: any) {
    const totalValue = parseFloat(
      products
        .reduce((a, b) => a + parseFloat(b.price.toString()), 0)
        .toFixed(2),
    );

    const lastOrder = await this.orderSchema.findOne().sort({ createdAt: -1 });

    return await this.orderSchema.create({
      status: 'pending',
      totalValue: totalValue,
      createdAt: new Date(),
      updatedAt: new Date(),
      customer: customer.id,
      products: products.map((product) => String(product.id)),
      orderNumber: lastOrder ? lastOrder.orderNumber + 1 : 1,
    });
  }

  async getOrder(id: string) {
    return await this.orderSchema.findById({ _id: id });
  }

  async getAllOrders() {
    return await this.orderSchema.find();
  }
}
