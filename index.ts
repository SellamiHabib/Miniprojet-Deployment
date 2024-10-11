import express from 'express';
import { env } from './env';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';
import { swaggerDocs } from './src/config/swaggerConfig';
import swaggerUi from 'swagger-ui-express';
import justifyRouter from './src/routes/justify.router';
import authRouter from './src/routes/auth.router';
import { errorHandler } from './src/middlewares/errorHandler.middleware';

const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const port = env.PORT || 3000;
app.use(bodyParser.text());
app.use(bodyParser.json()); // For token request parsing
app.get('/healthcheck', async (_req, res) => {
  res.status(StatusCodes.OK).send({
    status: 'ok',
  });
});

app.use('/api', justifyRouter);
app.use('/api', authRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
