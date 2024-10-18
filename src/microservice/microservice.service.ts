import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export class ProductsResponseDto {
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class MicroserviceService {
  constructor(private readonly httpService: HttpService) {}

  async getAllProducts(): Promise<Array<ProductsResponseDto>> {
    try {
      const url = 'http://localhost:3000/products';
      const response = await lastValueFrom(
        this.httpService.get<Array<ProductsResponseDto>>(url),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch data from microservice: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCustomerById() {
    try {
      const url = `http://localhost:3000/customer?cpf=${`464.970.168-64`}&email=${`aureo@test.com`}`;
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch data from microservice: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
