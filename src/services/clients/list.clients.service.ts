import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import { Repository } from 'typeorm';
import { responseAllClients } from '../../schemas/client.schema';
import { tClientResponse } from '../../interfaces/client.interface';

export const listAllClientsService = async (): Promise<
  Array<tClientResponse>
> => {
  const clientRepo: Repository<Client> = AppDataSource.getRepository(Client);

  const foundedClients: Array<Client> | null = await clientRepo.find();

  const allClients = responseAllClients.parse(foundedClients);

  return allClients;
};
