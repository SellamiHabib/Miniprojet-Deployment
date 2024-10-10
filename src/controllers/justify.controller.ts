import { Request, Response } from 'express';
import JustifyService from '../services/justify.service';
import { StatusCodes } from 'http-status-codes';
import { JustifyRequestInputDTO } from '../dtos/requests/justify.requests';

export const justifyTextController = (req: Request<{}, {}, JustifyRequestInputDTO>
  , res: Response) => {
  const text = req.body;

  const justifiedText = JustifyService.justifyText(text);

  res.status(StatusCodes.OK).send(justifiedText);

};
