import { Router } from 'express';
import { validateBodyMiddleware } from '../middleware/body.validate.mid';
import { contactSchema, updateContactSchema } from '../schemas/contact.schema';
import { verifyTokenMiddleware } from '../middleware/token.validate.mid';
import {
  createContactController,
  deleteContactController,
  listAllContactsController,
  listContactController,
  updateContactController,
} from '../controllers/contacts.controller';
import { verifyIsUUIDMiddleware } from '../middleware/verify.params.mid';

export const contactRoutes: Router = Router();

contactRoutes.post(
  '',
  verifyTokenMiddleware,
  validateBodyMiddleware(contactSchema),
  createContactController
);

contactRoutes.get('', verifyTokenMiddleware, listAllContactsController);
contactRoutes.get(
  '/:id',
  verifyIsUUIDMiddleware,
  verifyTokenMiddleware,
  listContactController
);
contactRoutes.delete(
  '/:id',
  verifyIsUUIDMiddleware,
  verifyTokenMiddleware,
  deleteContactController
);
contactRoutes.patch(
  '/:id',
  verifyIsUUIDMiddleware,
  verifyTokenMiddleware,
  validateBodyMiddleware(updateContactSchema),
  updateContactController
);
