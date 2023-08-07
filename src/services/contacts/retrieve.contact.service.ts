import { Contact } from '../../entities/contact.entity';
import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors';
import {
  tContactRepo,
  tContactResponse,
} from '../../interfaces/contact.interface';
import { responseContactSchema } from '../../schemas/contact.schema';

export const listContactService = async (
  contactId: string
): Promise<tContactResponse> => {
  const contactRepo: tContactRepo = AppDataSource.getRepository(Contact);

  const getContact: Contact | null = await contactRepo.findOne({
    where: {
      id: contactId,
    },
  });

  if (!getContact) throw new AppError('contact not found', 404);

  const contact = responseContactSchema.parse(getContact);

  return contact;
};
