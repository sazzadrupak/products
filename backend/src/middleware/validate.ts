/* eslint-disable indent */
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, Schema } from 'joi';

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((detail) => detail.message) });
    }
    next();
  };

export const validateParamId =
  (schema: Schema, paramName: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params[paramName]);
    if (error) {
      return res
        .status(400)
        .json({ error: `Invalid parameter: ${error.details[0].message}` });
    }
    next();
  };
