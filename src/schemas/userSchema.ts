import { z } from 'zod';
import { baseSchema } from './base.schema';

export const userSchema = baseSchema.extend(
  {
    email: z.string(),
    wordCount: z.number(),
    jwtToken: z.string(),
  },
);
export type User = z.infer<typeof userSchema>;
