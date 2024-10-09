import express from 'express';
import dotenv from 'dotenv';
import { env } from '../env';

dotenv.config();

const app = express();
const port = env.PORT || 3000;

app.get('/healthcheck', async (_req, res) => {
  res.status(200).send({
    status: 'ok',
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
