import { z } from 'zod';

export const justifyRequestBodySchema = z.string({
  message: 'Text must be a string',
});

export type JustifyRequestBodyDTO = z.infer<typeof justifyRequestBodySchema>;

export const justifyTextRequestHeadersSchema = z.object({
  'content-type': z
    .string({
      message: 'Content-Type must be a string',
    })
    .refine((value) => value === 'text/plain', {
      message: 'Content-Type must be text/plain',
      path: ['content-type'],
    }),
});
