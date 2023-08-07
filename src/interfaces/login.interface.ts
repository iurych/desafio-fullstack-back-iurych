import { z } from 'zod';
import { createTokenSchema } from '../schemas/login.schema';

export type tLoginRequest = z.infer<typeof createTokenSchema>;
