import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { ProductsResponseDto } from './dto/product-response.dto';

@Injectable()
export class MicroServiceService {
  private readonly logger = new Logger(MicroServiceService.name, {
    timestamp: true,
  });

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAllProducts(): Promise<Array<ProductsResponseDto>> {
    try {
      const url = 'http://localhost:3000/products';
      const { data } = await lastValueFrom(
        this.httpService.get<Array<ProductsResponseDto>>(url),
      );

      if (!data) {
        this.logger.error(`Products not found`);
        throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (error) {
      this.logger.error(
        `Failed to fetch data from microservice: ${error.message || error}`,
      );
      throw new HttpException(
        `Failed to fetch data from microservice: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCustomerByDocument(document: string) {
    try {
      const URL_CUSTOMERS_BY_DOCUMENT = `${this.configService.get<string>('LAMBDA_FUNCTION_HOST')}`;

      const { data } = await firstValueFrom(
        this.httpService.post<{ token: any }>(URL_CUSTOMERS_BY_DOCUMENT, {
          cpf: document,
        }),
      );

      if (!data) {
        this.logger.error(`Customer not found`);
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (error) {
      this.logger.error(
        `Failed to fetch data from microservice: ${JSON.stringify(error.message || error)}`,
      );
      throw new HttpException(
        `Failed to fetch data from microservice: ${JSON.stringify(error.message || error)}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductsById(
    id: string,
    token: string,
  ): Promise<ProductsResponseDto> {
    try {
      const URL_GET_PROJECT_BY_ID = `${this.configService.get<string>('API_ADMIN_HOST')}/products/${id}`;

      const { data } = await firstValueFrom(
        this.httpService.get<ProductsResponseDto>(URL_GET_PROJECT_BY_ID, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
      );

      if (!data) {
        this.logger.error(`Product with id: ${id} not found`);
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      return data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch data from microservice: ${JSON.stringify(error.message || error)}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
