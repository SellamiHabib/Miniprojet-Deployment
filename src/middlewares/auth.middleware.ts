import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwtUtils';
import { CustomError } from '../utils/CustomError';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('No authorization header found', StatusCodes.UNAUTHORIZED);
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new CustomError('No token found', StatusCodes.UNAUTHORIZED);
  }
  try {
    const decoded = verifyToken(token); // Verifies and decodes the token
    res.locals.user = decoded; // Attach user info to the request object
    next();
  } catch {
    throw new CustomError('Invalid or expired token', StatusCodes.UNAUTHORIZED);
  }
};
