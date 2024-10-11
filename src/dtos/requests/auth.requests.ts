import { z } from 'zod';
import { loginSchema } from '../../schemas/auth.schema';

export type TokenRequestInputDTO = z.infer<typeof loginSchema>;
