import {
  tContactRepo,
  tContactResponse,
} from '../../interfaces/contact.interface';
import { Contact } from '../../entities/contact.entity';
import { AppDataSource } from '../../data-source';
import { responseAllContactsSchema } from '../../schemas/contact.schema';

export const listAllContactsService = async (): Promise<
  Array<tContactResponse>
> => {
  const contactRepo: tContactRepo = AppDataSource.getRepository(Contact);

  const getContacts: Array<Contact> | null = await contactRepo.find();

  const allContact = responseAllContactsSchema.parse(getContacts);

  return allContact;
};
