import {
  tContactRepo,
  tContactRequest,
} from '../../interfaces/contact.interface';
import { AppDataSource } from '../../data-source';
import { Client } from '../../entities/client.entity';
import { Contact } from '../../entities/contact.entity';
import { AppError } from '../../errors';
import { responseContactSchema } from '../../schemas/contact.schema';
import { tClientRepo } from '../../interfaces/client.interface';

export const createContactService = async (
  clientId: string,
  payload: tContactRequest
) => {
  const clientRepo: tClientRepo = AppDataSource.getRepository(Client);
  const contactRepo: tContactRepo = AppDataSource.getRepository(Contact);

  const foundClient: Client | null = await clientRepo.findOneBy({
    id: clientId,
  });

  if (!foundClient) throw new AppError('user not found', 404);

  const existContact: Contact | null = await contactRepo.findOne({
    where: {
      fullName: payload.fullName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
    },
  });

  if (existContact) throw new AppError('Contact already exist', 409);

  const newContact = contactRepo.create({
    ...payload,
    client: foundClient,
  });
  await contactRepo.save(newContact);

  return responseContactSchema.parse(newContact);
};
