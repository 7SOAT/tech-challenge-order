import { Expose } from 'class-transformer';

export class UpdateOrderResponseDto {
  @Expose()
  _id: string;
  @Expose()
  status: number;
  @Expose()
  totalValue: number;
  @Expose()
  products: Array<string>;
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
