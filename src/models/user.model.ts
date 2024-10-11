import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string(),
  wordCount: z.number(),
  jwtToken: z.string(),
});
export type UserDTO = z.infer<typeof UserSchema>;
