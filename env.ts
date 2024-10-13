import { createEnv } from './src/utils/envValidator';
import { z } from 'zod';
import * as process from 'process';

export const env = createEnv({
  envSchema: z.object({
    PORT: z.string().min(1),
    APP_URL: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    REDIS_HOST: z.string().min(1),
    REDIS_PORT: z.string().min(1),
    REDIS_PASSWORD: z.string().min(1),
    HTTPS_ENABLED: z.enum(['true', 'false']),
  }),
  runtimeValues: {
    PORT: process.env.PORT,
    APP_URL: process.env.APP_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    HTTPS_ENABLED: process.env.HTTPS_ENABLED,
  },
  // skip validation in test environment
  skipValidation: process.env.NODE_ENV === 'test',
});
