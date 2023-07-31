import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import { Repository } from 'typeorm';
import {
  tClientResponse,
  tClientUpdate,
} from '../../interfaces/client.interface';
import { AppErorr } from '../../errors';
import { responseClientSchema } from '../../schemas/client.schema';

export const updateClientService = async (
  clientId: string,
  payload: tClientUpdate
): Promise<tClientResponse> => {
  const clientRepo: Repository<Client> = AppDataSource.getRepository(Client);

  const searchClient: Client | null = await clientRepo.findOneBy({
    id: clientId,
  });

  if (!searchClient) throw new AppErorr('client does not exist!', 404);

  const updateClient: Client = clientRepo.create({
    ...searchClient,
    ...payload,
  });

  const saveClientUpdated: Client = await clientRepo.save(updateClient);

  const clientWithoutPWD: tClientResponse =
    responseClientSchema.parse(saveClientUpdated);

  return clientWithoutPWD;
};
