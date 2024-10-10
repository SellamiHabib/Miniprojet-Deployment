import { z } from 'zod';

export const justifyRequestSchema = z.object({
  text: z.string({
    message: 'Text must be a string',
  }),
});

export type JustifyRequestInputDTO = z.infer<typeof justifyRequestSchema>;
