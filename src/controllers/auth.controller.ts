import { Request, Response } from 'express';
import TokenService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { TokenRequestInputDTO } from '../dtos/auth.dto';

export const authController = (req: Request<{}, {}, TokenRequestInputDTO>, res: Response) => {
  const { email } = req.body;
  const token = TokenService.generateToken(email);
  res.status(StatusCodes.OK).json({ token });
};
