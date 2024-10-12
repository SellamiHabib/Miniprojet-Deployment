import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      message: 'Email is required',
    })
    .email({
      message: 'Please provide a valid email',
    }),
});

export type TokenRequestInputDTO = z.infer<typeof loginSchema>;
