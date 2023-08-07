import { z } from 'zod';

export const contactSchema = z.object({
  fullName: z.string().max(60),
  email: z.string().email().max(45),
  phoneNumber: z.string().max(20),
});

export const responseContactSchema = contactSchema.extend({
  id: z.string().uuid(),
  registeredAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export const responseAllContactsSchema = responseContactSchema.array();
export const updateContactSchema = contactSchema.partial();
