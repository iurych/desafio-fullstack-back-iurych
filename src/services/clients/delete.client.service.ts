import { Client } from '../../entities/client.entity';
import { AppDataSource } from '../../data-source';
import { tClientRepo } from '../../interfaces/client.interface';

export const deleteClientService = async (clientId: string): Promise<void> => {
  const clientRepo: tClientRepo = AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepo.findOneBy({
    id: clientId,
  });

  await clientRepo.remove(client!);
};
