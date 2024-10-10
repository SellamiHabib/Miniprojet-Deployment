import { createEnv } from './src/utils/envValidator';
import { z } from 'zod';


export const env = createEnv({
  envSchema: z.object({
    PORT: z.string().min(1),
    APP_URL: z.string().min(1),
  }),
  runtimeValues: {
    PORT: process.env.PORT,
    APP_URL: process.env.APP_URL,
  },
  skipValidation: false,
});

