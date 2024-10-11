// Global error handler
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });

};
