import { Expose } from 'class-transformer';

export class CreateOrderResponseDto {
  @Expose()
  _id: string;

  @Expose()
  status: number;

  @Expose()
  totalValue: number;

  @Expose()
  products: string[];

  @Expose()
  customer: string;

  @Expose()
  payment: string;

  @Expose()
  orderNumber: number;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
