import { Document, Schema } from 'mongoose';

export interface OrderDocument extends Document {
  status: string;
  totalValue: number;
  products: Array<string>;
  customer: string;
  payment: string;
  orderNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

export const OrderSchema = new Schema(
  {
    status: { type: Schema.Types.String, ref: 'OrderStatus' },
    totalValue: Number,
    products: [{ type: Schema.Types.String, ref: 'Product' }],
    customer: {
      type: Schema.Types.String,
      ref: 'Customer',
      default: null,
    },
    payment: { type: Schema.Types.String, ref: 'Payment' },
    orderNumber: { type: Number, unique: true, required: true },
  },
  { timestamps: true },
);
