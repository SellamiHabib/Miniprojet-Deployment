import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utils/jwtUtils';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Authorization header is missing' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token is required' });
    return;
  }
  try {
    const decoded = verifyToken(token);  // Verifies and decodes the token
    res.locals.user = decoded;  // Attach user info to the request object
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid or expired token' });
  }

};
