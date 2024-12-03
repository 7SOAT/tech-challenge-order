import { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
    _id: {
      type: Schema.Types.String,
      default: uuidv4,
    },
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
