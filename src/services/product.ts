import Product, { IProduct } from '../models/product';

export const createProduct = async (product: IProduct) => {
  return Product.create(product);
};
