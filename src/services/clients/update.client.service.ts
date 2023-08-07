import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import {
  tClientRepo,
  tClientResponse,
  tClientUpdate,
} from '../../interfaces/client.interface';
import { AppError } from '../../errors';
import { responseClientSchema } from '../../schemas/client.schema';

export const updateClientService = async (
  clientId: string,
  payload: tClientUpdate
): Promise<tClientResponse | null> => {
  const clientRepo: tClientRepo = AppDataSource.getRepository(Client);

  const searchClient: Client | null = await clientRepo.findOneBy({
    id: clientId,
  });

  if (!searchClient) throw new AppError('client does not exist!', 404);

  if (searchClient.email == payload.email)
    throw new AppError('Email has already exist', 409);
  if (searchClient.phoneNumber == payload.phoneNumber)
    throw new AppError('phoneNumber has already exist', 409);
  if (searchClient.fullName == payload.fullName)
    throw new AppError('fullName has already exist', 409);

  const updateClient: Client = clientRepo.create({
    ...searchClient,
    ...payload,
  });

  const saveClientUpdated: Client = await clientRepo.save(updateClient);

  const clientWithoutPWD: tClientResponse =
    responseClientSchema.parse(saveClientUpdated);

  return clientWithoutPWD;
};
