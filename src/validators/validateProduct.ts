import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const productSchema = Joi.object().keys({
  productName: Joi.string().min(2).max(20).required(),
  price: Joi.number().positive().precision(2).required(),
  description: Joi.string().min(2).max(100).required(),
  inStock: Joi.boolean(),
});

export const validateProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = productSchema.validate(req.body, { convert: false });
  if (error) {
    return res.status(400).json({ error: error?.details[0]?.message });
  }
  next();
};
