import jwt from 'jsonwebtoken';
import { env } from '../../env';

const JWT_SECRET = env.JWT_SECRET;

export const signToken = (email: string): string => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};
