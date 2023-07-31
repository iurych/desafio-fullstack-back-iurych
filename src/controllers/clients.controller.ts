import { Request, Response } from 'express';
import { createClientService } from '../services/clients/create.client.service';
import { listAllClientsService } from '../services/clients/list.clients.service';
import { retriveClientService } from '../services/clients/retrieve.client.service';
import { deleteClientService } from '../services/clients/delete.client.service';
import { updateClientService } from '../services/clients/update.client.service';

export const createClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = await createClientService(req.body);

  return res.status(201).json(newUser);
};

export const listAllClientsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allClients = await listAllClientsService();

  return res.json(allClients);
};

export const listClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const client = await retriveClientService(req.params.id);

  return res.json(client);
};

export const deleteClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await deleteClientService(req.params.id);

  return res.status(204).send();
};

export const updateClientController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;
  const updateClient = await updateClientService(id, req.body);

  return res.json(updateClient);
};
