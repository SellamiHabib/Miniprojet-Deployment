import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../../env';
import { CustomError } from './CustomError';
import { StatusCodes } from 'http-status-codes';

const JWT_SECRET = env.JWT_SECRET;

export const signToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new CustomError('Invalid or expired token', StatusCodes.UNAUTHORIZED);
  }
};
