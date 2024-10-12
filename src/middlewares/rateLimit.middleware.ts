import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { JustifyRequestInputDTO } from '../dtos/requests/justify.requests';
import { CustomError } from '../utils/CustomError';

const MAX_WORDS_PER_DAY = 80000;

const authService = new AuthService();
export const rateLimitMiddleware = async (
  req: Request<unknown, unknown, JustifyRequestInputDTO>,
  res: Response,
  next: NextFunction,
) => {
  const text = req.body;
  const user = res.locals.user;

  if (!text) {
    throw new CustomError('Text is required', StatusCodes.BAD_REQUEST);
  }

  const userDetails = await authService.getUserDetails(user.email);
  const wordCount = text.split(/\s+/).length;

  if (userDetails && userDetails.wordCount + wordCount > MAX_WORDS_PER_DAY) {
    throw new CustomError('You have exceeded the daily word limit, payment required', StatusCodes.PAYMENT_REQUIRED);
  }

  authService.updateWordCount(userDetails.email, wordCount);
  next();
  return;
};
