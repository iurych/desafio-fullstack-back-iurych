import { z } from 'zod';
import { clientSchema, responseClientSchema } from '../schemas/client.schema';
import { DeepPartial, Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

export type tClientRequest = z.infer<typeof clientSchema>;
export type tClientResponse = z.infer<typeof responseClientSchema>;
type clienToUpdate = z.infer<typeof clientSchema>;
export type tClientUpdate = DeepPartial<clienToUpdate>;
export type tClientRepo = Repository<Client>;
