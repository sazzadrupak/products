import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  description: Joi.string().required(),
});

export const productIdSchema = Joi.string().uuid().required();
