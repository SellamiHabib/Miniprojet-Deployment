import { createEnv } from './src/utils/envValidator';
import { z } from 'zod';
import process from 'node:process';
export const env = createEnv({
  envSchema: z.object({
    PORT: z.string().min(1),
  }),
  runtimeValues: {
    PORT: process.env.PORT,
  },
  skipValidation: false,
});

