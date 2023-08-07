import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import { responseAllClientsSchema } from '../../schemas/client.schema';
import {
  tClientRepo,
  tClientResponse,
} from '../../interfaces/client.interface';

export const listAllClientsService = async (): Promise<
  Array<tClientResponse>
> => {
  const clientRepo: tClientRepo = AppDataSource.getRepository(Client);

  const foundedClients: Array<Client> | null = await clientRepo.find();

  const allClients = responseAllClientsSchema.parse(foundedClients);

  return allClients;
};
