import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import { responseClientSchema } from '../../schemas/client.schema';
import {
  tClientRepo,
  tClientResponse,
} from '../../interfaces/client.interface';

export const retriveClientService = async (
  clientId: string
): Promise<tClientResponse | null> => {
  const clientRepo: tClientRepo = AppDataSource.getRepository(Client);

  const foundClient: Client | null = await clientRepo.findOne({
    where: {
      id: clientId,
    },
  });

  const client = responseClientSchema.parse(foundClient);

  return client;
};
