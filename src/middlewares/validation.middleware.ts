import { NextFunction, Request, Response } from 'express';
import { z, ZodError, ZodIssue } from 'zod';

import { StatusCodes } from 'http-status-codes';
import { CustomError } from '../utils/CustomError';

export function validateData(schema: z.ZodObject<any, any, any, any, any> | z.ZodString) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: issue.message,
        }));
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid data', details: errorMessages });
      } else {
        throw new CustomError('Invalid data', StatusCodes.BAD_REQUEST);
      }
    }
  };
}

export function validateHeaders(schema: z.ZodObject<any, any, any, any, any> | z.ZodString) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.headers);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: ZodIssue) => ({
          message: issue.message,
        }));
        res
          .status(StatusCodes.UNSUPPORTED_MEDIA_TYPE)
          .json({ error: 'Invalid request headers', details: errorMessages });
      } else {
        throw new CustomError('Invalid data', StatusCodes.BAD_REQUEST);
      }
    }
  };
}
