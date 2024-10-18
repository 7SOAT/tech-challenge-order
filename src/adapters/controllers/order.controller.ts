import { Injectable } from '@nestjs/common';
import CreateOrderDto from 'src/api/dto/order/create-order.dto';
import OrderUseCase from 'src/core/usecases/order.usecase';
import { MicroserviceService } from 'src/microservice/microservice.service';

@Injectable()
export default class OrderController {
  constructor(
    private readonly orderUserCase: OrderUseCase,
    private readonly mircroservice: MicroserviceService,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    console.log('dto', dto);
  }

  async getOrder(id: string) {
    console.log('id', id);
  }

  async getAllOrders() {
    // const response = await this.mircroservice.getAllProducts();
    const response = await this.mircroservice.getCustomerById();
    console.log('response', response);
    return await this.orderUserCase.getAll();
  }
}
