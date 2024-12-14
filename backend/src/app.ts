import cors from 'cors';
import express from 'express';

import pgPool from './config/db';
import errorHandler from './middleware/errorHandler';
import routes from './routes';

const app = express();
app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.locals.pgPool = pgPool;

app.use('/api/v1', routes);
app.use(errorHandler);

export default app;
