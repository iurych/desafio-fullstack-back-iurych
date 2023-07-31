import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { AppDataSource } from '../../data-source';
import { AppErorr } from '../../errors';

export const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepo: Repository<Client> = AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepo.findOneBy({
    id: clientId,
  });

  await clientRepo.remove(client!);
};
