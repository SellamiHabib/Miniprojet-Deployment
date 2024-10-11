import { z } from 'zod';

export const baseSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date().default(new Date()),
  updatedAt: z.coerce.date().default(new Date()),
});
export type BaseModel = z.infer<typeof baseSchema>;
