import mongoose, { Schema } from 'mongoose';

export interface IProduct {
  productName: string;
  price: number;
  description: string;
  inStock: boolean;
}

const schema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  price: { type: Number, required: true, min: 0 },
  description: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
  },
});

const Product = mongoose.model<IProduct>('Product', schema);
export default Product;
