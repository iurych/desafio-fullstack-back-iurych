import { z } from 'zod';

export const createTokenSchema = z.object({
  email: z.string().email().max(45),
  password: z.string().max(120),
});
