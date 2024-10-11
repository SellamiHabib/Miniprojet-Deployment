import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({
    message: 'Email is required',
  }),
});

export type TokenRequestInputDTO = z.infer<typeof loginSchema>;
