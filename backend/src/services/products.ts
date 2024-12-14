import Boom from '@hapi/boom';
import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';

export type productType = {
  name: string;
  description: string;
};

export const createProduct = async (pg: Pool, productBody: productType) => {
  try {
    const id = uuidv4();
    const { name, description } = productBody;
    await pg.query(
      `
      INSERT INTO products (product_id, name, description)
      VALUES ($1, $2, $3)`,
      [id, name, description]
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProducts = async (pg: Pool) => {
  try {
    const { rows } = await pg.query('SELECT * FROM products');
    return rows;
  } catch (error) {
    console.log(error);
    throw Boom.internal();
  }
};

export const getProductById = async (pg: Pool, id: string) => {
  try {
    const { rows } = await pg.query(
      'SELECT * FROM products WHERE product_id = $1',
      [id]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    throw Boom.internal();
  }
};

export const updateProduct = async (
  pg: Pool,
  id: string,
  productBody: productType
) => {
  try {
    const { name, description } = productBody;
    await pg.query(
      'UPDATE products SET name = $1, description = $2 WHERE product_id = $3',
      [name, description, id]
    );
  } catch (error) {
    console.log(error);
    throw Boom.internal();
  }
};

export const deleteProduct = async (pg: Pool, id: string) => {
  try {
    await pg.query('DELETE FROM products WHERE product_id = $1', [id]);
  } catch (error) {
    console.log(error);
    throw Boom.internal();
  }
};
