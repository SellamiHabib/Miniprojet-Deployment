import { Request, Response } from 'express';
import JustifyService from '../services/justify.service';
import { StatusCodes } from 'http-status-codes';
import { JustifyRequestInputDTO } from '../dtos/requests/justify.requests';

const justifyService = new JustifyService();
export const justifyTextController = (req: Request<object, object, JustifyRequestInputDTO>, res: Response) => {
  const text = req.body;

  const justifiedText = justifyService.justifyText(text);

  res.status(StatusCodes.OK).send(justifiedText);
};
