import { z } from 'zod';
import { DeepPartial, Repository } from 'typeorm';
import {
  contactSchema,
  responseContactSchema,
} from '../schemas/contact.schema';
import { Contact } from '../entities/contact.entity';

export type tContactRequest = z.infer<typeof contactSchema>;
export type tContactResponse = z.infer<typeof responseContactSchema>;
type contactToUpdate = z.infer<typeof contactSchema>;
export type tContactUpdate = DeepPartial<contactToUpdate>;
export type tContactRepo = Repository<Contact>;
