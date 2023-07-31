import { Router } from 'express';
import {
  createClientController,
  deleteClientController,
  listAllClientsController,
  listClientController,
  updateClientController,
} from '../controllers/clients.controller';
import { validateBodyMiddleware } from '../middleware/body.validate.mid';
import { clientSchema, updateClientSchema } from '../schemas/client.schema';
import { ensureUniqueDataMiddleware } from '../middleware/verify.data.mid';
import { verifyClientByIdMiddleware } from '../middleware/verify.clientId.mid';

export const userRoutes: Router = Router();

userRoutes.post(
  '',
  validateBodyMiddleware(clientSchema),
  ensureUniqueDataMiddleware,
  createClientController
);

userRoutes.get('', listAllClientsController);
userRoutes.get('/:id', verifyClientByIdMiddleware, listClientController);
userRoutes.delete('/:id', verifyClientByIdMiddleware, deleteClientController);
userRoutes.patch(
  '/:id',
  validateBodyMiddleware(updateClientSchema),
  verifyClientByIdMiddleware,
  updateClientController
);
