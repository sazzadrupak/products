import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (error && Boom.isBoom(error)) {
    const { statusCode, payload } = error.output;
    return res.status(statusCode).json({ error: payload.message });
  }

  // console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
};

export default errorHandler;
