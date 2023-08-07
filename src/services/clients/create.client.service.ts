import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import {
  tClientRepo,
  tClientRequest,
  tClientResponse,
} from '../../interfaces/client.interface';
import { responseClientSchema } from '../../schemas/client.schema';

export const createClientService = async (
  payload: tClientRequest
): Promise<tClientResponse> => {
  const clientRepo: tClientRepo = AppDataSource.getRepository(Client);

  const client: Client = clientRepo.create(payload);

  await clientRepo.save(client);

  const clientWithoutPWD: tClientResponse = responseClientSchema.parse(client);

  return clientWithoutPWD;
};
