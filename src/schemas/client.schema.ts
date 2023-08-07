import { z } from 'zod';

export const clientSchema = z.object({
  fullName: z.string().max(60),
  email: z.string().email().max(45),
  phoneNumber: z.string().max(20),
  password: z.string().max(120),
});

export const responseClientSchema = clientSchema
  .extend({
    id: z.string(),
    registeredAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({
    password: true,
  });

export const responseAllClientsSchema = responseClientSchema.array();
export const updateClientSchema = clientSchema.partial();
