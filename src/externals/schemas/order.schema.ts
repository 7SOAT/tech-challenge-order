import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  status: String,
  totalValue: Number,
  orderNumber: Number,
  createdAt: Date,
  updatedAt: Date,
});
