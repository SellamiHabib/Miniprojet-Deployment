import { z } from 'zod';

export const authenticatedRequestSchema = z.object({
  token: z.string({
    message: 'Token is required',
  }),
});
