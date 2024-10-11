import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { TokenRequestInputDTO } from '../dtos/requests/auth.requests';

export const authController = async (req: Request<{}, {}, TokenRequestInputDTO>, res: Response) => {
  const { email } = req.body;
  const token = await AuthService.generateToken(email);
  res.status(StatusCodes.OK).json({ token });
};
