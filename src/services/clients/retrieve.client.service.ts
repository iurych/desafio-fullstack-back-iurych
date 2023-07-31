import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import { Repository } from 'typeorm';
import { AppErorr } from '../../errors';
import { responseClient } from '../../schemas/client.schema';
import { tClientResponse } from '../../interfaces/client.interface';

export const retriveClientService = async (
  clientId: string
): Promise<tClientResponse | null> => {
  const clientRepo: Repository<Client> = AppDataSource.getRepository(Client);

  const foundClient: Client | null = await clientRepo.findOne({
    where: {
      id: clientId,
    },
  });

  const client = responseClient.parse(foundClient);

  return client;
};
