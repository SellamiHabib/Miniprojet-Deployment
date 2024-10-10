import { z } from 'zod';
import { loginSchema } from '../schemas/auth.schema';

export type TokenRequestInputDTO = z.infer<typeof loginSchema>;
export type UserDTO = {
  email: string;
  wordCount: number;
}
