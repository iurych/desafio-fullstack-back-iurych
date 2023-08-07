import { Contact } from '../../entities/contact.entity';
import { AppDataSource } from '../../data-source';
import {
  tContactRepo,
  tContactResponse,
  tContactUpdate,
} from '../../interfaces/contact.interface';
import { responseContactSchema } from '../../schemas/contact.schema';
import { AppError } from '../../errors';

export const updateContactService = async (
  payload: tContactUpdate,
  contactId: string
): Promise<tContactResponse> => {
  const contactRepo: tContactRepo = AppDataSource.getRepository(Contact);

  const oldContact: Contact | null = await contactRepo.findOne({
    where: {
      id: contactId,
    },
  });

  if (!oldContact) throw new AppError('contact not found', 404);

  if (oldContact.email == payload.email)
    throw new AppError('Email has already exist', 409);
  if (oldContact.phoneNumber == payload.phoneNumber)
    throw new AppError('phoneNumber has already exist', 409);
  if (oldContact.fullName == payload.fullName)
    throw new AppError('fullName has already exist', 409);

  const updateContact: Contact = contactRepo.create({
    ...oldContact,
    ...payload,
  });

  await contactRepo.save(updateContact);

  return responseContactSchema.parse(updateContact);
};
