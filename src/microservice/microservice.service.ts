import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

export interface ProductsResponseDto {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

export interface CustomerResponseDto {
  id: string;
  name: string;
  email: string;
  cpf: string;
}

@Injectable()
export class MicroServiceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

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

  async getCustomerByDocument(
    document: string,
    email: string,
  ): Promise<CustomerResponseDto> {
    try {
      const url = `${this.configService.get<string>('API_MONOLITH_HOST')}/customers/by-params`;
      const { data } = await lastValueFrom(
        this.httpService.get(url, {
          params: {
            cpf: document,
            email: email,
          },
        }),
      );

      return data as CustomerResponseDto;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch data from microservice: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsById(id: string): Promise<ProductsResponseDto> {
    try {
      const url = `${this.configService.get<string>('API_MONOLITH_HOST')}/products/${id}`;
      const response = await lastValueFrom(
        this.httpService.get<ProductsResponseDto>(url),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch data from microservice: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
