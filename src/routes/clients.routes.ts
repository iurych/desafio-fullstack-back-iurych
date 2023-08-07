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
import { verifyIsUUIDMiddleware } from '../middleware/verify.params.mid';

export const userRoutes: Router = Router();

userRoutes.post(
  '',
  validateBodyMiddleware(clientSchema),
  ensureUniqueDataMiddleware,
  createClientController
);

userRoutes.get('', listAllClientsController);
userRoutes.get(
  '/:id',
  verifyIsUUIDMiddleware,
  verifyClientByIdMiddleware,
  listClientController
);
userRoutes.delete(
  '/:id',
  verifyIsUUIDMiddleware,
  verifyClientByIdMiddleware,
  deleteClientController
);
userRoutes.patch(
  '/:id',
  verifyIsUUIDMiddleware,
  verifyClientByIdMiddleware,
  validateBodyMiddleware(updateClientSchema),
  updateClientController
);
