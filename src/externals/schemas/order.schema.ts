import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  status: { type: String },
  totalValue: { type: Number },
  orderNumber: { type: Number },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

export interface OrderDocument extends Document {
  status: string;
  totalValue: number;
  orderNumber: number;
  createdAt: Date;
  updatedAt: Date;
}
