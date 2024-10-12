import express from 'express';
import { env } from '../env';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';
import { swaggerDocs } from './config/swaggerConfig';
import swaggerUi from 'swagger-ui-express';
import justifyRouter from './routes/justify.router';
import authRouter from './routes/auth.router';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.text());
app.use(bodyParser.json());
app.get('/healthcheck', async (_req, res) => {
  res.status(StatusCodes.OK).send({
    status: 'ok',
  });
});

app.use('/api', justifyRouter);
app.use('/api', authRouter);

app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${env.PORT}`);
});