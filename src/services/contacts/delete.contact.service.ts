import { AppDataSource } from '../../data-source';
import { Contact } from '../../entities/contact.entity';
import { AppError } from '../../errors';
import { tContactRepo } from '../../interfaces/contact.interface';

export const delteContactService = async (contactId: string): Promise<void> => {
  const contactRepo: tContactRepo = AppDataSource.getRepository(Contact);

  const getContact: Contact | null = await contactRepo.findOne({
    where: {
      id: contactId,
    },
  });

  if (!getContact) throw new AppError('contact not found', 404);

  await contactRepo.remove(getContact);
};
