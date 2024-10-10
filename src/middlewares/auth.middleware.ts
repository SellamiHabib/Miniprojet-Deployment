import { NextFunction, Request, Response } from 'express';
import TokenService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { env } from '../../env';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token is required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, env.JWT_SECRET);
    const decoded = jwt.decode(token);
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    return;
  }
  const tokenDetails = TokenService.getTokenDetails(token);
  if (!tokenDetails) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid token' });
    return;
  }
  req.body.token = tokenDetails;
  next();

};
