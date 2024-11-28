import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from '../../api/dto/order/create-order.dto';
import { OrderUseCase } from '../../core/usecases/order.usecase';
import { MicroServiceService } from '../../microservice/microservice.service';

@Injectable()
export class OrderController {
  private readonly logger = new Logger(OrderController.name, {
    timestamp: true,
  });
  constructor(
    private readonly orderUserCase: OrderUseCase,
    private readonly microService: MicroServiceService,
  ) {}

  async createOrder({ productIds, document, email }: CreateOrderDto) {
    try {
      const responseCustomer = await this.microService.getCustomerByDocument(
        document,
        email,
      );
      this.logger.log(`Customer found: ${JSON.stringify(responseCustomer)}`);
      const responseProducts = [];

      for (const productId of productIds) {
        responseProducts.push(
          await this.microService.getProductsById(productId),
        );
      }
      return await this.orderUserCase.create(
        responseCustomer,
        responseProducts,
      );
    } catch (error) {
      this.logger.error(
        `Failed to create order: ${JSON.stringify(error.message || error)}`,
      );
      throw new HttpException(
        `Failed to fetch data from microservice: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrder(id: string) {
    return await this.orderUserCase.getOrderById(id);
  }

  async getAllOrders() {
    return await this.orderUserCase.getAll();
  }
}
