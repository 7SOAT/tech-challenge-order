export class UpdateOrderResponseDto {
  _id: string;
  status: string;
  totalValue: number;
  products: Array<string>;
  customer: string;
  payment: string;
  orderNumber: number;
  createdAt: Date;
  updatedAt: Date;
}
