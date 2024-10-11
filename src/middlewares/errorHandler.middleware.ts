import { Request, Response } from 'express';
import { CustomError } from '../utils/CustomError';

// Global error handler middleware
export const errorHandler = (err: Error, req: Request, res: Response) => {
  let statusCode = 500;
  let message = 'Something went wrong';

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log the error (you could use a logger here)
  console.error(`[Error] ${err.message}`);

  // Send the error response
  res.status(statusCode).json({ message });
};
