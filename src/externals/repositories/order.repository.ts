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

  async createOrder(customer: string, products: any) {
    try {
      const totalValue = parseFloat(
        products
          .reduce((a, b) => a + parseFloat(b.price.toString()), 0)
          .toFixed(2),
      );

      const lastOrder = await this.orderSchema
        .findOne()
        .sort({ createdAt: -1 });

      console.log(products.map((product) => String(product.id)));
      const response = await this.orderSchema.create({
        status: 'pending',
        totalValue: totalValue,
        createdAt: new Date(),
        updatedAt: new Date(),
        customer: customer.sub ? customer.sub : null,
        products: products.map((product) => product.id),
        orderNumber: lastOrder ? lastOrder.orderNumber + 1 : 1,
      });

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  async getOrder(id: string) {
    return await this.orderSchema.findOne({ _id: id });
  }

  async getAllOrders() {
    return await this.orderSchema.find();
  }
}
