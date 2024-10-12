import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { StatusCodes } from 'http-status-codes';
import { TokenRequestInputDTO } from '../dtos/requests/auth.requests';

const authService = new AuthService();
export const AuthController = async (req: Request<object, object, TokenRequestInputDTO>, res: Response) => {
  const { email } = req.body;
  const token = await authService.generateToken(email);
  res.status(StatusCodes.OK).json({ token });
};
