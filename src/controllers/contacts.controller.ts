import { Request, Response } from 'express';
import { createContactService } from '../services/contacts/create.contact.service';
import { listAllContactsService } from '../services/contacts/list.contact.service';
import { listContactService } from '../services/contacts/retrieve.contact.service';
import { delteContactService } from '../services/contacts/delete.contact.service';
import { updateContactService } from '../services/contacts/update.contact.service';

export const createContactController = async (req: Request, res: Response) => {
  const { clientId } = res.locals;
  const newContact = await createContactService(clientId, req.body);

  return res.status(201).json(newContact);
};

export const listAllContactsController = async (
  req: Request,
  res: Response
) => {
  const allContacts = await listAllContactsService();

  return res.json(allContacts);
};

export const listContactController = async (req: Request, res: Response) => {
  const contact = await listContactService(req.params.id);

  return res.json(contact);
};

export const updateContactController = async (req: Request, res: Response) => {
  const contactUpdated = await updateContactService(req.body, req.params.id);

  return res.json(contactUpdated);
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await delteContactService(req.params.id);

  return res.status(204).send();
};
