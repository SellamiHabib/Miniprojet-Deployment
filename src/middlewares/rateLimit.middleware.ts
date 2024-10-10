import { NextFunction, Request, Response } from 'express';
import TokenService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { JustifyRequestInputDTO } from '../dtos/requests/justify.requests';

const MAX_WORDS_PER_DAY = 80000;

export const rateLimitMiddleware = (req: Request<unknown, unknown, JustifyRequestInputDTO>, res: Response, next: NextFunction) => {
  const text = req.body;
  const token = res.locals.token;

  if (!text) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Text is required' });
  }

  const tokenDetails = TokenService.getTokenDetails(token);
  const wordCount = text.split(/\s+/).length;

  if (tokenDetails && (tokenDetails.wordCount + wordCount) > MAX_WORDS_PER_DAY) {
    res.status(StatusCodes.PAYMENT_REQUIRED).json({ error: 'Word limit exceeded' });
  }

  TokenService.updateTokenWordCount(token, wordCount);
  next();
};
