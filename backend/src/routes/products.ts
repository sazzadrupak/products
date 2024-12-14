import Boom from '@hapi/boom';
import Router from 'express-promise-router';

import { validate, validateParamId } from '../middleware/validate';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../services/products';
import { productIdSchema, productSchema } from '../validation/product';
const router = Router();

router.post('/', validate(productSchema), async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { pgPool } = req.app.locals;
    await createProduct(pgPool, { name, description });
    res.status(201).send({ message: 'Product created successfully!' });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { pgPool } = req.app.locals;
    const products = await getProducts(pgPool);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:productId',
  validateParamId(productIdSchema, 'productId'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { pgPool } = req.app.locals;
      const product = await getProductById(pgPool, productId);
      res.send(product);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:productId',
  validateParamId(productIdSchema, 'productId'),
  validate(productSchema),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { name, description } = req.body;
      const { pgPool } = req.app.locals;
      const product = await getProductById(pgPool, productId);
      if (!product) {
        throw Boom.notFound('Product not found');
      }
      await updateProduct(pgPool, productId, { name, description });
      res.status(204).send({ message: 'Product updated successfully!' });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:productId',
  validateParamId(productIdSchema, 'productId'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { pgPool } = req.app.locals;
      const product = await getProductById(pgPool, productId);
      if (!product) {
        throw Boom.notFound('Product not found');
      }
      await deleteProduct(pgPool, productId);
      res.status(204).send({ message: 'Product deleted successfully!' });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
