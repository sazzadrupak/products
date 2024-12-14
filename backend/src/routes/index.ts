import Router from 'express-promise-router';

import products from './products';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.use('/products', products);

export default router;
