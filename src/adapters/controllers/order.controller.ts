import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from 'src/api/dto/order/create-order.dto';
import { OrderUseCase } from 'src/core/usecases/order.usecase';
import { MicroServiceService } from 'src/microservice/microservice.service';

@Injectable()
export class OrderController {
  constructor(
    private readonly orderUserCase: OrderUseCase,
    private readonly mircroService: MicroServiceService,
  ) {}

  async createOrder({ customerId, productIds }: CreateOrderDto) {
    const responseCustomer = await this.mircroService.getCustomerByDocument(
      '',
      '',
    );
    const responseProducts = [];

    for (const productId of productIds) {
      responseProducts.push(
        await this.mircroService.getProductsById(productId),
      );
    }
    return await this.orderUserCase.create(responseCustomer, responseProducts);
  }

  async getOrder(id: string) {
    return await this.orderUserCase.getOrderById(id);
  }

  async getAllOrders() {
    return await this.orderUserCase.getAll();
  }
}
